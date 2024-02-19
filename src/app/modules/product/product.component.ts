import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/header/header.component';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';
import { NzImageDirective, NzImageModule } from 'ng-zorro-antd/image';

import { imageFallback } from '../../core/constants/imageFallback';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { ColorsComponent } from '../../shared/colors/colors.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Product } from '../../core/interfaces/product';
import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import {
  NzCommentActionComponent,
  NzCommentComponent,
  NzCommentModule,
} from 'ng-zorro-antd/comment';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NzHeaderComponent,
    HeaderComponent,
    NzCardComponent,
    NzTabComponent,
    NzTabSetComponent,
    NzImageDirective,
    NzImageModule,
    NzRateComponent,
    FormsModule,
    ColorsComponent,
    NzButtonComponent,
    CurrencyPipe,
    NzCommentComponent,
    NzAvatarComponent,
    NzCommentActionComponent,
    NgTemplateOutlet,
    NzCommentModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  protected readonly imageFallback = imageFallback;
  constructor(
    private route: ActivatedRoute,
    private shop: ShopService,
    private changeDetector: ChangeDetectorRef
  ) {}
  data: Product | null = null;
  currentImage: string | null | undefined = null;
  commentData = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        children: [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          },
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          },
        ],
      },
    ],
  };
  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
    this.shop
      .getProduct(+this.route.snapshot.paramMap.get('id')!)
      .subscribe((res: Product) => {
        this.data = res;
        this.currentImage = this.data?.images[0];
        this.changeDetector.markForCheck();
      });
  }
}
