import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { PanelService } from '../../../core/services/panel.service';
import {
  BlogPost,
  ResponseShortBlogPost,
  ShortBlogPost,
} from '../../../core/interfaces/blogPost';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterLink } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ShopService } from '../../../core/services/shop.service';
import { delay } from 'rxjs';
import { NewPostComponent } from '../../blog/new-post/new-post.component';

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
  ],
})
export class BlogComponent implements OnInit {
  constructor(
    private panel: PanelService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef,
    private shop: ShopService
  ) {}
  page: number = 0;
  pageSize: number = 50;
  total: number = 0;
  data: ShortBlogPost[] | null = null;
  fetching: boolean = true;
  ngOnInit(): void {
    this.panel
      .getBlogs()
      .pipe(delay(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ResponseShortBlogPost) => {
        this.fetching = false;
        this.data = res.data;
        this.changeDetector.markForCheck();
      });
  }
  deleteBlog(ID: number) {
    this.shop.deleteBlog(ID).subscribe(() => {
      this.data = this.data?.filter(el => el.ID != ID) ?? [];
      this.changeDetector.markForCheck();
    });
  }
  sending: boolean = false;
  submitPost({ title, text }: { title: string; text: string }) {
    this.changeDetector.markForCheck();
    this.sending = true;
    this.shop
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
          const newPosts: ShortBlogPost[] = this.data.slice(0);
          newPosts.unshift({
            title,
            ID: res.id,
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
