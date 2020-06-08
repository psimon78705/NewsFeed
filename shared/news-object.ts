import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class NewsObject {
    id: Number = -1;
    by: string;
    time: Number;
    text: string;
    url: string;
    title: string;

    get External(){
        return  this.url && !this.text ? true : false;
    }

    get Loaded(){
        return this.id > 0;
    }
    
    LoadData(data: {}){
        if(data) {
            var func = data.hasOwnProperty.bind(data);
            this.id = func('id') ? data['id'] : -1;
            this.by = func('by') ? data['by'] : "";
            this.time = func('time') ? data['time'] * 1000 : 0;
            this.text = func('text') ? data['text'] : null;
            this.url = func('url') ? data['url'] : null;
            this.title = func('title') ? data['title'] : "";
        }
    }
}
