import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];

  //Subject is sublass of observable.
  //Subject publish events 
  //all subscribers will receive this event.
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
    //check if already have item in our cart
    let alreadyExistsInCart:boolean=false;
    let existingCartItem :CartItem | undefined  =undefined;

    if (this.cartItems.length>0){
      existingCartItem=this.cartItems.find((temp)=>{temp.id===theCartItem.id});
      //check if we found it
      alreadyExistsInCart=(existingCartItem != undefined)

    }
    if (alreadyExistsInCart){
      //increment quantity
      existingCartItem!.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
    
  }
  computeCartTotals(){
    let toalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for (let tempCartProduct of this.cartItems){
      toalPriceValue += tempCartProduct.unitPrice * tempCartProduct.quantity;
      totalQuantityValue += tempCartProduct.quantity;  
    }

    //publish new values ...all subscribers will receive new data and ui will be updated
    //.next will publish event.
    this.totalPrice.next(toalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
