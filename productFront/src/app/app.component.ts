import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ProductSearchComponent } from "../core/product-managment/product-search/product-search.component"; 

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [ProductSearchComponent]
})
export class AppComponent {

}
