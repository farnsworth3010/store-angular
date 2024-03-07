import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ShopService } from '../../../core/services/shop/shop.service';
import { BlogPost } from '../../../core/interfaces/blogPost';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputGroupComponent,
    NzSelectModule,
    ReactiveFormsModule,
    NzInputModule,
    NzUploadModule,
    NzButtonModule,
    NzAutocompleteModule,
    FormsModule,
    JsonPipe,
  ],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBlogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}
  @Input() data!: BlogPost;
  ngOnInit(): void {
    this.blogForm.patchValue({
      title: this.data.title,
      text: this.data.text,
    });
  }
  blogForm = this.fb.group({
    title: ['', [Validators.required]],
    text: ['', [Validators.required]],
  });
}
