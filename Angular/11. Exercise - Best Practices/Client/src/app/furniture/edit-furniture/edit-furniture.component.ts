import { Component, OnInit } from '@angular/core';
import { FurnitureService } from "../furniture.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FurnitureModel } from "../models/furniture.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit {
  bindingModel: FurnitureModel;
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private furnitureService : FurnitureService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.furnitureService.getFurnitureById(
      this.route.snapshot.params['id']
    ).subscribe(data => {
      this.bindingModel = data;
    })
  }

  edit() {
    this.furnitureService
      .editFurnitureById(this.bindingModel.id, this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Edited furniture successfully!', 'Success!');
        this.router.navigateByUrl('/furniture/all');
      });
  }

}
