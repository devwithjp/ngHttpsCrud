import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})


export class PostsService {

  uri : string = "https://jsonplaceholder.typicode.com/posts";

  posts: any =[];

  constructor(private _http : HttpClient) 
  {

  }  

  getAll() { 
     return this._http.get(this.uri) 
   }

   
  getById(id : number) { 
    return this._http.get(this.uri +'/'+  id); 
  }

   create(post : any) { 
     
      return this._http.post(this.uri,
          JSON.stringify(post))
   }


   update(post: any) {
      
      return this._http.put(this.uri +'/'+post.id,
         JSON.stringify(post), {
           responseType : 'json'
         });
 
   }


  delete(post : any){
    return this._http
      .delete(this.uri +'/'+post.id) 
  }

}
