import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from "../models/furniture.model";
import { Observable } from "rxjs/index";

import { FurnitureService } from "../furniture.service";
import { AuthService } from "../../authentication/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;
  constructor(
    private furnitureService: FurnitureService,
    private authService: AuthService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.furnitures = this.furnitureService.getAllFurniture();
  }

  changePage(page) {
    this.currentPage = page;
  }

  deleteItem(id: string) {
    this.furnitureService.deleteFurniture(id)
      .subscribe(() => {
        this.toastr.success('Furniture deleted successfully!', 'Success!');
        this.furnitures = this.furnitureService.getAllFurniture();
      })
  }
}
