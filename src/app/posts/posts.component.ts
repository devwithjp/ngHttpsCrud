import { PostsService } from './../services/posts.service';
import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs'; 
 
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
 

export class PostsComponent implements OnInit  {
   
  posts: any = [];

  constructor(private _httpService : PostsService)
   {
      
  }

  ngOnInit () {
    this.getAll();
  }
  
  getAll( ) {
    this.posts = this._httpService.getAll().subscribe(data => {
        this.posts = data;  
    }); 
     
  }
  
  createPost(input : HTMLInputElement) {
       
       let post :any = {
         title : input.value 
       }; 

       this._httpService.create(post)
          .subscribe(res =>
          { 
            post['id'] = 100;
            this.posts.splice(0,0,post);
          }); 
  } 
 
  updatePost(post : any) { 
     let updatedPost : any = {
        id : post.id,
        title : "newly update post"
     } 
 

      this._httpService.update(updatedPost)
          .subscribe( res=> {
            
            let index= this.posts.indexOf(post);
            this.posts[index].title =updatedPost.title;
         
      }); 
     
  }


  deletePost(post:any) {
      this._httpService.delete(post)
      .subscribe( res => {
           
           let index =  this.posts.indexOf(post);
          this.posts.splice(index,1);

      }, (error : Response) => {
          if(error.status == 404) {
            alert('this post has been deleted');
          }
          else {
            alert('something went wrong');
          }

      })
  }


  search(input : HTMLInputElement) {

      

    console.log(this.posts.includes(input.value));

  }

}
