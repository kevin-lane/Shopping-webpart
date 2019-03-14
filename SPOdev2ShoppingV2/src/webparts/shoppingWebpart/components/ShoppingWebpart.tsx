import * as React from 'react';
import styles from './ShoppingWebpart.module.scss';
import { IShoppingWebpartProps, ISPLists, ISPList } from './IShoppingWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Cart from './Cart';
import { default as pnp, ItemAddResult, Util  } from 'sp-pnp-js';

export interface IShoppingWebpartState{ //
  items: ISPList[];
  message:string;
  // number:number;
  itemsInCart: ISPList[];
}

export default class ShoppingWebpart extends React.Component<IShoppingWebpartProps, IShoppingWebpartState> {
  
  constructor(props: IShoppingWebpartProps){
    super(props);

    this.state = {
      items: this.props.products,
      message: 'Order summary',
      // number:3,
      itemsInCart:  [] 
    };
  }
  
  public addToCart(productId: string) : any{
    console.log("Product added to cart: ", productId);

    // Hitta produkten med id = Id från this.state.items
    var tempCart = this.state.itemsInCart;

    for(var i = 0; i < this.state.items.length; i++) {
      if(this.state.items[i].Id == productId) {
        console.log(this.state.items[i].Title);
        tempCart.push(this.state.items[i]);
      }
    }

    console.log("Items in cart: ", tempCart);
    this.setState({
      itemsInCart: tempCart
    });
  }

  public render(): React.ReactElement<IShoppingWebpartProps> {
    let items=[];

    for(let i = 0; i < this.state.items.length; i++){
      items.push(<div key={this.state.items[i].Id}>
        {this.state.items[i].Title} <br />
        {this.state.items[i].ECWS_x002e_Category} <br />
        {this.state.items[i].ECWS_x002e_Price} <br />
        <button onClick={this.addToCart.bind(this, this.state.items[i].Id)}>Add to Cart</button>
      </div>);
    }
    
    let latestChosenProduct = '';
      if (this.state.itemsInCart.length > 0) {
        latestChosenProduct = this.state.itemsInCart[this.state.itemsInCart.length - 1].Title;
      }
      else {}

    return (
      <div className={ styles.shoppingWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to Kevin webshop!</span>
              <Cart message={latestChosenProduct}  number={this.state.itemsInCart.length} products={this.state.itemsInCart}></Cart>
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
