import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventComponent } from './components/event/event/event.component';
import { CanLeavePostCreateGuard } from './shared/guards/can-leave-post-create.guard';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { LoginComponent } from './components/misc/login/login.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { PostResolverGuard } from './shared/resolvers/post-resolver.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users',  canActivate: [IsAuthenticatedGuard], component: UserListComponent },
  { path: 'events', canActivate: [IsAuthenticatedGuard], component: EventListComponent},
  { path: 'events/:id', canActivate: [IsAuthenticatedGuard], component: EventComponent }

  // { path: 'users/:userId/posts',  canActivate: [IsAuthenticatedGuard], canDeactivate:[CanLeavePostCreateGuard], component: PostListComponent },
  // { path: 'users/:userId/posts/:id',  canActivate: [IsAuthenticatedGuard], resolve: { post: PostResolverGuard }, component: PostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
