import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { BlogPost } from '../../../core/interfaces/blogPost';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NzCardComponent, DatePipe, MarkdownComponent, NzDividerComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() data!: BlogPost;
}
