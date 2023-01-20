import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "blog", loadChildren: () => import('./admin/admin-components/blog/blog.module').then((module) => module.BlogModule) }
    ]
  },

  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
