import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ShoppingWebpartWebPartStrings';
import ShoppingWebpart from './components/ShoppingWebpart';
import { IShoppingWebpartProps, ISPList } from './components/IShoppingWebpartProps';
import { sp } from 'sp-pnp-js';
 
export interface IShoppingWebpartWebPartProps {
  description: string;
  category: string;
  price: number;
}

export default class ShoppingWebpartWebPart extends BaseClientSideWebPart<IShoppingWebpartWebPartProps> {
//Hämta data från listan "Produkter" i SharePoint och visa i webbdelen
  public render(): void {
    sp.web.lists.getByTitle("Produkter").items.get().then((result) => {
    const element: React.ReactElement<IShoppingWebpartProps> = React.createElement(
      ShoppingWebpart,
      {
        description: this.properties.description,
        products: result,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient
      }
    );
    ReactDom.render(element, this.domElement);
  });
}
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
