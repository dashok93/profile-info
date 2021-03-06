import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataSourseService } from '../domain/services/data-sourse.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { BlobInputModel, BlobBody } from '../domain/models/blob-body-model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  @ViewChild('popupId') modal: ElementRef;
  @Input() pageType: string;
  @Output() onUpdate = new EventEmitter();

  dataSourseService: DataSourseService;
  jsonData: any;
  public editorOptions: JsonEditorOptions;
  constructor(dataSourseService: DataSourseService) {
    this.dataSourseService = dataSourseService;
    this.editorOptions = new JsonEditorOptions()
    // this.editorOptions.mode = 'tree';
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    
  }

  ngOnInit(): void {
  }
  save(){
    console.log(this.editor.get());
    // $("popupId").modal('hide');
    this.onUpdate.emit(this.editor.get());
    let blobInputModel: BlobInputModel = {
      File: this.pageType,
      Content: JSON.stringify(this.editor.get())
    }
    let blobBody: BlobBody = {
      body: JSON.stringify(blobInputModel)
    }

    this.dataSourseService.updateBlob(blobInputModel).subscribe( data => { });
  }

  edit() {
    switch (this.pageType?.toLocaleLowerCase()) {
      case "profile":
        this.dataSourseService.getProfilePageData().then(data => {
          this.jsonData = data;
        })
        break;
      case "projects":
        this.dataSourseService.getProjectsPageData().then(data => {
          this.jsonData = data;
        })
        break;
      case "contacts":
        this.dataSourseService.getContactPageData().then(data => {
          this.jsonData = data;
        })
        break;
      case "blog":
        this.dataSourseService.getProfilePageData().then(data => {
          this.jsonData = data;
        })
        break;
      case "about":
        this.dataSourseService.getAboutPageData().then(data => {
          this.jsonData = data;
        })
        break;
      default:
        break;
    }
  }

}
