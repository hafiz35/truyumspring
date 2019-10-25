import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './site/login/login.component';
import { HeaderComponent } from './site/header/header.component';
import { FooterComponent } from './site/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './site/signup/signup.component';
import { SearchComponent } from './food/search/search.component';
import { ItemInfoComponent } from './food/item-info/item-info.component';
import { MenuComponent } from './food/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shopping/cart/cart.component';
import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { NotfoundComponent } from './site/notfound/notfound.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    ItemInfoComponent,
    MenuComponent,
    CartComponent,
    ItemEditComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
