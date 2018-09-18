//Modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FurnitureRoutingModule } from "./furniture.routing.module";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";

//Services
import { FurnitureService } from "./furniture.service";

//Components
import { furnitureComponents } from "./index";


@NgModule({
  declarations: [
    ...furnitureComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    FurnitureRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    FurnitureService
  ]
})

export class FurnitureModule {

}
