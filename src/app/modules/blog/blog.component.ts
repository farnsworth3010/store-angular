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

  posts: BlogPost[] | null = null;
  page: number = 0;
  total: number = 0;
  fetching: boolean = true;
  sending: boolean = false;
  submitPost({ title, text }: { title: string; text: string }) {
    this.changeDetector.markForCheck();
    this.fetching = true;
    this.sending = true;
    this.shop
      .addPost(title, text)
      .pipe(delay(1000))
      .subscribe(res => {
        if (!this.posts?.length) {
          const newPosts: BlogPost[] = [];
          newPosts.push({
            title,
            text,
            id: res.id,
            creation_date: new Date(),
          });
          this.posts = newPosts;
        } else {
          const newPosts: BlogPost[] = this.posts.slice(0);
          newPosts.unshift({
            title,
            text,
            id: res.id,
            creation_date: new Date(),
          });
          this.posts = newPosts;
        }
        console.log('New post id: ' + res.id);
        this.sending = false;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }

  ngOnInit() {
    this.shop
      .getPosts(this.page, 5)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ResponseBlogPost) => {
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
      .getPosts(page, 5)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(1000))
      .subscribe((res: ResponseBlogPost) => {
        this.posts = res.data;
        this.total = res.total;
        this.fetching = false;
        this.changeDetector.markForCheck();
      });
  }
}
