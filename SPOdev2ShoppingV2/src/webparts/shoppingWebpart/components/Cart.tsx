import * as React from 'react';
import styles from './ShoppingWebpart.module.scss';
import { IShoppingWebpartProps, ISPList, ISPLists } from './IShoppingWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {  default as pnp, ItemAddResult, Util  } from 'sp-pnp-js';
import ShoppingWebpart from './ShoppingWebpart';

  export interface ICartProps{
    message:string;
    number:number;
    products: ISPList[];
  }

export default class Cart extends React.Component<ICartProps, any> { //ändra till any för att läsa av vilka props/state som helst
 
public confirmOrder() : any{
    console.log("Create the order: ", this.props.products);
//Lägg till i Ordrar
    pnp.sp.web.currentUser.get().then((user) => {
        pnp.sp.web.lists.getByTitle("Ordrar").items.add({
            Title: Util.getGUID(),
            ECWS_x002e_UserId: user.Id,
            ECWS_x002e_Date: new Date()
            }).then(newOrder => {
              console.log(newOrder);
//Lägg till i orderrader
              for(let i = 0; i < this.props.products.length; i++) {
                pnp.sp.web.lists.getByTitle("Orderrader").items.add({
                    ECWS_x002e_OrderId: newOrder.data.Id,
                    ECWS_x002e_ProductId: this.props.products[i].Id
                }).then(newOrderRow => {
                    console.log(newOrderRow);
                });
            }
        });
    });
}

  public render(): React.ReactElement<IShoppingWebpartProps> {
    let products = [];

    return (
      <div className={ styles.shoppingWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <div>{this.props.message}</div>
              <div>{this.props.number}</div>
              <button onClick={this.confirmOrder.bind(this)}>Confirm order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
