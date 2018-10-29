import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController, Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';
// import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'closings',
  templateUrl: 'closings.html'
})
export class ClosingsComponent implements OnInit {

  selectData:any;
  stats:any;
  pdf:any;
  constructor(
    private data:DataService,
    private loading:LoadingController,
    //private document: DocumentViewer,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private platform: Platform,
    private auth: AuthService
  ) {}

  ngOnInit(){
    this.loadData();
  }

  loadData(query:string = ''){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    console.log("QUERY:",query)
    this.data.getClosingData('/accounting/closings',query)
      .then( data => {
        console.log('CLOSING DATA:',data)
        this.selectData = data.filter( d => d.type === 'select-with-onchange-handler').map(d => d.content)[0];
        this.stats = data.filter( d => d.type === 'list-icon')[0];
        this.pdf = data.filter( d => d.type === 'table')[0];

        console.log("PDF DATA:",this.pdf)

        loading.dismiss();
      })
      .catch( error => {
        console.log(error)
        loading.dismiss();
      });
  }

  openPDF(url:string) {
    console.log();
    this.downloadAndOpenPdf(url);
  }

  async downloadAndOpenPdf(url:string) {
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }

    const token = await this.auth.getToken();

    console.log("TOKEN:",token);
    console.log("PDF LINK:",url);
    const finalURL = 'https://portal.everest.hu'+url;

    const transfer = this.transfer.create();
    transfer.download(finalURL, path + 'myfile.pdf',true,
    {
      headers: {
          "Authorization": "Bearer "+token
      }
    }
  ).then(entry => {
      let url = entry.toURL();
      //this.document.viewDocument(url, 'application/pdf', {});
      this.fileOpener.open(url,'application/pdf');
    }).catch;
  }

}
