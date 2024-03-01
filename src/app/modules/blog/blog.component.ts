import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { delay } from 'rxjs';
import { OnlyAdminsDirective } from '../../core/directives/only-admins.directive';
import { BlogPost } from '../../core/interfaces/blogPost';
import { ApiPaginatedResponse } from '../../core/interfaces/response';
import { BlogService } from '../../core/services/blog/blog.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';

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
    private blog: BlogService,
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
    this.blog
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
    this.blog
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
    this.blog
      .getBlog(page, 5)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ApiPaginatedResponse<BlogPost>) => {
        this.posts = res.data;
        this.total = res.total;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }
  deleteBlog(ID: number) {
    this.blog.deleteBlog(ID).subscribe(() => {
      this.posts = this.posts?.filter((el: BlogPost) => {
        return el.ID != ID;
      });
      this.changeDetector.markForCheck();
    });
  }
}
