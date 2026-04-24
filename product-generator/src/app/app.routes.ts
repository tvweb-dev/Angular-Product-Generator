import { Routes } from '@angular/router';
import { ProductCreatePage } from './pages/product-create.page';
import { ProductDetailPage } from './pages/product-detail.page';
import { ProductsListPage } from './pages/products-list.page';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'products' },
	{ path: 'products', component: ProductsListPage },
	{ path: 'products/new', component: ProductCreatePage },
	{ path: 'products/:id', component: ProductDetailPage },
	{ path: '**', redirectTo: 'products' }
];
