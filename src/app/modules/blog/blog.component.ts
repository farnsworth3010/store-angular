import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { BlogPost, ResponseBlogPost } from '../../core/interfaces/blogPost';
import { ShopService } from '../../core/services/shop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { PostComponent } from './post/post.component';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { delay } from 'rxjs';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NewPostComponent } from './new-post/new-post.component';
import { OnlyAdminsDirective } from '../../core/directives/only-admins.directive';
import { ApiPaginatedResponse } from '../../core/interfaces/response';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NzHeaderComponent,
    HeaderComponent,
    NzEmptyComponent,
    PostComponent,
    NzCardComponent,
    NzSkeletonComponent,
    NzPaginationComponent,
    NewPostComponent,
    OnlyAdminsDirective,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  constructor(
    private shop: ShopService,
    private destroyRef: DestroyRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  posts: BlogPost[] | null | undefined = null;
  page: number = 0;
  total: number = 0;
  fetching: boolean = true;
  sending: boolean = false;
  submitPost({ title, text }: { title: string; text: string }) {
    this.changeDetector.markForCheck();
    this.sending = true;
    this.shop
      .createBlog(title, text)
      .pipe(delay(1000))
      .subscribe(res => {
        if (!this.posts?.length) {
          const newPosts: BlogPost[] = [];
          newPosts.push({
            title,
            text,
            ID: res.id,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          });
          this.posts = newPosts;
        } else {
          const newPosts: BlogPost[] = this.posts.slice(0);
          newPosts.unshift({
            title,
            text,
            ID: res.id,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          });
          this.posts = newPosts;
        }
        this.sending = false;
        this.changeDetector.markForCheck();
      });
  }

  ngOnInit() {
    this.shop
      .getBlog(this.page, 5)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ApiPaginatedResponse<BlogPost>) => {
        this.posts = res.data;
        this.total = res.total;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }

  pageIndexChange(page: number) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.page = page;
    this.fetching = true;
    this.shop
      .getBlog(page, 5)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ResponseBlogPost) => {
        this.posts = res.data;
        this.total = res.total;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }
  deleteBlog(ID: number) {
    this.shop.deleteBlog(ID).subscribe(() => {
      this.posts = this.posts?.filter((el: BlogPost) => {
        return el.ID != ID;
      });
      this.changeDetector.markForCheck();
    });
  }
}
