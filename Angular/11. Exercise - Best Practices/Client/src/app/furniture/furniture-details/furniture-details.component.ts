import { Component, OnInit } from '@angular/core';
import {FurnitureModel} from "../models/furniture.model";
import {ActivatedRoute} from "@angular/router";
import {FurnitureService} from "../furniture.service";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furnitureModel: Observable<FurnitureModel>;
  id: string;
  constructor(private route: ActivatedRoute, private furnitureService: FurnitureService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.furnitureModel = this.furnitureService.getFurnitureDetails(this.id);
  }

}
