import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PanelService } from '../../../core/services/panel/panel.service';
import { BlogPost } from '../../../core/interfaces/blogPost';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterLink } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ShopService } from '../../../core/services/shop/shop.service';
import { delay } from 'rxjs';
import { NewPostComponent } from '../../blog/new-post/new-post.component';
import { ApiPaginatedResponse } from '../../../core/interfaces/response';
import { BlogService } from '../../../core/services/blog/blog.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditBlogComponent } from '../../../shared/forms/edit-blog/edit-blog.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    RouterLink,
    NzPopconfirmModule,
    NewPostComponent,
    NzModalModule,
    EditBlogComponent,
  ],
})
export class BlogComponent implements OnInit {
  constructor(
    private panel: PanelService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    private shop: ShopService,
    private blog: BlogService
  ) {}
  pageSize: number = 50;
  total: number = 0;
  data: BlogPost[] | null = null;
  fetching: boolean = true;
  isModalVisible: boolean = false;
  currentEditing!: BlogPost;
  limit: number = 30;
  page: number = 1;
  @ViewChild(EditBlogComponent) editBlog!: EditBlogComponent;

  openModal(blog: BlogPost): void {
    this.currentEditing = blog;
    this.changeDetector.markForCheck();
    this.isModalVisible = !this.isModalVisible;
  }
  changePage(page: number) {
    this.fetchBlog(page, this.limit);
  }
  fetchBlog(page: number, limit: number) {
    this.fetching = true;
    this.blog
      .getBlog(page - 1, limit) // FIX
      .pipe(delay(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ApiPaginatedResponse<BlogPost>) => {
        this.fetching = false;
        this.total = res.total;
        this.data = res.data;
        this.changeDetector.markForCheck();
      });
  }
  closeModal(): void {
    this.isModalVisible = false;
  }
  ngOnInit(): void {
    this.fetchBlog(this.page, this.limit);
  }
  deleteBlog(ID: number) {
    this.blog.deleteBlog(ID).subscribe(() => {
      this.data = this.data?.filter(el => el.ID != ID) ?? [];
      this.changeDetector.markForCheck();
    });
  }
  updatePost() {
    const { title, text } = this.editBlog.blogForm.getRawValue();
    const id = this.editBlog.data.ID;
    this.closeModal();
    this.blog
      .updateBlog(id, title!, text!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchBlog(this.page, this.limit);
      });
  }
  sending: boolean = false;
  submitPost({ title, text }: { title: string; text: string }) {
    this.changeDetector.markForCheck();
    this.sending = true;
    this.blog
      .createBlog(title, text)
      .pipe(delay(1000))
      .subscribe(res => {
        if (!this.data?.length) {
          const newPosts: BlogPost[] = [];
          newPosts.push({
            title,
            text,
            ID: res.id,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          });
          this.data = newPosts;
        } else {
          const newPosts: BlogPost[] = this.data.slice(0);
          newPosts.unshift({
            title,
            ID: res.id,
            text,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          });
          this.data = newPosts;
        }
        this.sending = false;
        this.changeDetector.markForCheck();
      });
  }
}
