import { Component } from '@angular/core';
import { count } from 'angular-pipes/utils/utils';
declare var cv : any;
 /// new line
var avg_arr : any [][] = [];  // เก็บ ต ของ center ไว้

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page { 
  //base64 ที่ไว้รับค่ามาจากการเลือกไฟล์ภาพ
  image:string|ArrayBuffer
  //base64 ที่ไว้รับค่ามาจาก func opencv
  output:string

  perimiterSize: number;
  areaSize: number;
  contour: any;

  constructor() {
    console.log(cv)
    //Object.assign(this, fields);
  }
  

  inputImage($event){
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
     myReader.onloadend = (e) => {
      this.image = myReader.result
      this.createCanvas(myReader.result).then((res)=>{
       this.output = this.bufferToBase64(this.testProcessing(res))
     })
    }
    myReader.readAsDataURL(file);
  }
  createCanvas(src){
    return new Promise((resolve, reject)=>{
      const canvas = document.createElement("canvas");
      canvas.setAttribute("id", "image");
      const ctx = canvas.getContext("2d");
      let image = new Image();
      image.src = src
      image.onload = () => {
       ctx.drawImage(image, 0, 0 );
       resolve(image)
      }
     })
  }
  testProcessing(image){
    let srcMat = cv.imread(image);
    let displayMat = srcMat.clone();
    let circlesMat = new cv.Mat();
    let M = cv.Mat.ones(5, 5, cv.CV_8U); 
    let ksize = new cv.Size(3, 3);
    let anchor = new cv.Point(-1, -1);

    //***  */
    // * Array find circle
    var collect_radius : any[] = [];
    var collect_center : any[] = [];
    var length_x : Array<number>;
    var length_y : Array<number>;
    length_x = [] 
    length_y = [] 
   
    var sum_radious : number;
    let sum_radious_result : number;
    sum_radious = 0;
    sum_radious_result = 0;
    let c : number;
    let max_x : number;
    let max_y : number;
    let min_x : number;
    let min_y : number;
    c = 0;
    max_x = 0;
    max_y = 0;
    min_x = 0;
    min_y = 0;
    let color = new cv.Scalar(255, 125, 0);
    // let color2 = new cv.Scalar(125, 58, 125);
    // let color3 = new cv.Scalar(0, 251, 125);

    ///*   array distance
    var x1,y1,x2,y2 : number;
    let sumx : number;
    let sumy : number;
    let sumxy : number;
    let distance_xy : number;

    var arr_distance : Array<number>;
    arr_distance = []
    var arr_distance_a1 : Array<number>;
    arr_distance_a2 = []
    var arr_distance_a2 : Array<number>;
    arr_distance_a2 = []
    var arr_distance_a3 : Array<number>;
    arr_distance_a3 = []
    var arr_distance_a4 : Array<number>;
    arr_distance_a4 = []
    
    let z = 0 ; 

    // var collect_new_center = [];
    let rectangleColor = new cv.Scalar(123, 255, 125);
    
    ///* Divide column by distance
    let length_column = 8;
    // let length_row = 12;

    ///* Fix row and column  
      //// collect pointer in collect_radius and collect_center
    var column0 = [];
    var column_A = [];
    var column_B = [];
    var column_C = [];
    var column_D = [];
    var column_E = [];
    var column_F = [];
    var column_G = [];
    var column_H = [];
    /// new line
    var result_values_x:any = [];
    var result_values_y:any = [];

    //**Other count global in "main1_Drawcircle" function variable
    let countb = 0; 

    /*
    Clear image declease noise
    */
    cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
    //cv.blur(srcMat, srcMat, ksize, anchor, cv.BORDER_DEFAULT);
    cv.blur(srcMat, srcMat, ksize, anchor, cv.BORDER_DEFAULT);
    cv.GaussianBlur(srcMat, srcMat, ksize, 0, 0, cv.BORDER_DEFAULT);
    //cv.GaussianBlur(srcMat, srcMat, ksize, 0, 0, cv.BORDER_DEFAULT);
    //cv.Canny(srcMat, srcMat, 50, 200, 3, false);
    cv.dilate(srcMat, srcMat, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    /*****************************
     * To use function Here
     ****************************/
    main1_Drawcircle(srcMat);
    // srcMat = displayMat;
    // predefined1(srcMat);

    /***************************
     * Add function
     ***************************/
    function main1_Drawcircle (imga)

    {
      // * find circle algorithm    
      cv.HoughCircles(imga, circlesMat, cv.HOUGH_GRADIENT, 1, 50, 60, 40, 1, 50);

      for (let i = 0; i < circlesMat.cols; ++i) 
      {
          let x = circlesMat.data32F[i * 3];
          let y = circlesMat.data32F[i * 3 + 1];
          let radius = circlesMat.data32F[i * 3 + 2];

          let center = new cv.Point(x, y);
          //cv.circle(displayMat, center, radius, color, 3);
          collect_radius.push(radius);
          collect_center.push(center);
          // var centerx = ~~center.x;
          // var centery = ~~center.y;

          length_x.push(center.x);
          length_y.push(center.y);
  
      } // * end find circle algorithm

      console.log("collect centet : ",collect_center);
      console.log("collect x : ",length_x);
      console.log("collect y : ",length_y);

      /// * using sort to find radius length
      let sort_length_x = [...length_x];
      let sort_length_y = [...length_y];
      sort_length_x.sort
        (function(a,b)
          {
            return a-b
          }
        );
        sort_length_y.sort
        (function(a,b)
          {
            return a-b
          }
        );
        collect_radius.sort
        (function(a,b)
          {
            return a-b
          }
        );
        /// * end using sort to find radius length
        
        
      console.log("Length array y : ",sort_length_y.length);
      console.log("length array x : ",sort_length_x.length);
      min_y = sort_length_y[0];
      max_y = (sort_length_y[sort_length_y.length-1]);
      min_x = sort_length_x[0];
      max_x = (sort_length_x[sort_length_x.length-1]);
      console.log("min x :",min_x);
      console.log("max x :",max_x);
      console.log("min y :",min_y);
      console.log("max y :",max_y);
      let a1 = new cv.Point(min_x,max_y);
      let a2 = new cv.Point(min_x,min_y);
      let a3 = new cv.Point(max_x,min_y);
      let a4 = new cv.Point(max_x,max_y);
      var tt = [a1,a2,a3,a4]
      console.log("find 4 largest corner in tt array is : ",tt);
      
      // * find radius length in circle 
      for(let i = 0 ; i < (collect_radius.length / 4 ) ; i++) 
      {
        sum_radious += collect_radius[i];
        c ++ ;  
      } 
      
      sum_radious_result = sum_radious /c ;
      console.log("sum_radious_result",sum_radious_result);
      
      /// * draw new circle
      for (let i = 0; i < collect_radius.length ; ++i) 
      {          
        // cv.circle(displayMat, collect_center[i], sum_radious_result, [0, 0, 0, 255], 3);
      }

      ////* create array to collect distance
      for (let i = 0; i < 4; i++) 
      {
        // console.log("Array",tt); 
        
        // console.log("at array ",i,": x is :",tt[i].x);
        x1 = tt[i].x;
        y1 = tt[i].y;
        // console.log(Math.pow(2,2));

        for (let j in collect_center) 
        {
          let ddy = collect_center[j];
          y2 = (ddy.y);
          x2 = (ddy.x);
          sumx = (Math.pow((x1-x2),2));
          sumy = (Math.pow((y1-y2),2));
          sumxy = sumx + sumy ;
          distance_xy = Math.sqrt(sumxy);
          arr_distance.push(distance_xy);
        }
        z ++ ;
        console.log("z :",z);
        if(z == 1)
        {
          arr_distance_a1 = arr_distance; // เก็บ arr_distance ใน arr_distance_a1
          console.log(" collected array arr_distance_a1 at z a1:",z); 
        }
        else if(z ==2)
        {
          arr_distance_a2 = arr_distance;
          console.log(" collected array arr_distance_a2 at z a2 :",z);
        }
        else if(z == 3)
        {
          arr_distance_a3 = arr_distance;
          console.log(" collected array arr_distance_a3 at z a3 :",z);
        }
        else if(z ==4)
        {
          arr_distance_a4 = arr_distance;
          console.log(" collected array arr_distance_a4 at z a4 :",z);
        } 
        arr_distance = [];
      }
      
      
      //*** sort the corner find shortest distance*/
        //*** clone an arrat */
      let sort_a1 = [...arr_distance_a1];
      let sort_a2 = [...arr_distance_a2];
      let sort_a3 = [...arr_distance_a3];
      let sort_a4 = [...arr_distance_a4];
      console.log("arr_distance_a1",arr_distance_a1);
    
        //*** create array  */
      var arr_dist_collect = [arr_distance_a1,arr_distance_a2,arr_distance_a3,arr_distance_a4]
      var arr_sort = [sort_a1,sort_a2,sort_a3,sort_a4]
      for (let g = 0; g < arr_sort.length; g++) {
        arr_sort[g].sort
        (function(a,b)
          {
            return a-b
          }
        );
      }
      

      // //** find near distance */
            //*** 

      // for (let h in arr_dist_collect)
      // {
      //   var aaa = arr_dist_collect[h]
      //   // console.log("aaa",aaa);
      //   for( l in aaa )
      //   {
      //     if (aaa[l] == sort_a1[0])
      //     {
      //       console.log("aaa[l] : ",aaa[l]);
      //       console.log("L1 is :",l);
      //       collect_new_center.push( collect_center[l])
      //       break;
      //         }
      //     else if (aaa[l] == sort_a2[0])
      //     {
      //       console.log("L2 is :",l);
      //       console.log("aaa[l] : ",aaa[l]);
      //       collect_new_center.push( collect_center[l])

      //       break;
      //     }
      //     else if (aaa[l] == sort_a3[0])
      //     {
      //       console.log("L3 is :",l);
      //       console.log("aaa[l]: ",aaa[l]);
      //       collect_new_center.push( collect_center[l])
      //       break;
      //     }
      //     else if (aaa[l] == sort_a4[0])
      //     {
      //       console.log("L4 is :",l);
      //       console.log("aaa[l] : ",aaa[l]);
      //       collect_new_center.push( collect_center[l])
      //       break;
      //     }
      //   }
      // }

      // ///*** select new edge */
      // console.log("lol point  ",collect_new_center);
      // ///*** end select new edge */

      // cv.line(displayMat, collect_new_center[0], collect_new_center[1], rectangleColor, 2, cv.LINE_AA, 0);
      // // cv.line(displayMat, collect_new_center[0], collect_new_center[3], rectangleColor, 2, cv.LINE_AA, 0);
      // // cv.line(displayMat, collect_new_center[1], collect_new_center[2], rectangleColor, 2, cv.LINE_AA, 0);
      // cv.line(displayMat, collect_new_center[2], collect_new_center[3], rectangleColor, 2, cv.LINE_AA, 0);
        //*** 

      //**Collect pointer's sorted array */
      let countAA = 0;
      let countSS = 0;
      var col_p_ar = [];
      var sort_length_x2 = [...sort_length_x];
      var length_x2 = [...length_x];
      for (let countA = 0;countA < sort_length_x2.length; countA ++)
      {
        // console.log("sort_length_x2 : ",sort_length_x2[countA]);
        // console.log("countA",countA);
        for (let countS = 0; countS < length_x2.length; countS++) 
        {
          // console.log("length_x2 : " , length_x[countS]);
          // console.log("countS : " , countS); //num_pointers 
          countSS ++;
          if (sort_length_x2[countA] == length_x2[countS])
          {
            // console.log("check number match",countSS);
            
            col_p_ar.push(countSS - 1);
            length_x2.splice(countS,1,length_x.length+1);
            sort_length_x2.splice(countA,1,sort_length_x.length+2);
            countSS = 0;
            break;
          } 
        }
        countAA = 1;
      }
      console.log(col_p_ar);
        //**************/ Clear string //******* */
      if (countAA != 0 )
      {
        sort_length_x2 = [];
        length_x2 = [];
      }
      /**End collect pointer's sorted array */    

        /*
        * Divide column by distance of x  
        */ 
      let member_x = (length_x.length / length_column); 
      var num_length;
      let cc =0 ;
      let dd = 0;
      for(num_length in length_x)
      {
        column0.push(col_p_ar[num_length]);
        dd ++;
        if(dd == member_x) // เก็บจนถึงตาม จ.สมาชิก
        {
          if(cc == 0)
          {
            column_A = [...column0];
            column0 = []; 
            cc ++;
          }
          else if (cc == 1)
          {
            column_B = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 2)
          {
            column_C = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 3)
          {
            column_D = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 4)
          {
            column_E = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 5)
          {
            column_F = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 6)
          {
            column_G = [...column0];
            column0 = [];
            cc ++;
          }
          else if (cc == 7)
          {
            column_H = [...column0];
            column0 = [];
            cc ++;
          }
          dd = 0 ;
        }
      }      
      var Collect_column = [column_A,column_B,column_C,column_D,column_E,column_F,column_G,column_H];
        /*
        * End Divide column by distance of x 
        */ 


      /*
       *find new point for draw new circle   
       */
      let k;
      let kk; 
      /// new line
      if  (cc == 8)
      {
        for (k in Collect_column) // k = A-H
        { 
          var kkkk = [];
          let col_x : any = []; 
          let col_y : any = []; 
          kkkk = Collect_column[k];
          avg_arr.push([k]);
          for (kk in Collect_column[k]) //kk=0-11 // row
          {
            // console.log("center at :",collect_center[kkkk[kk]]);
            col_x.push(collect_center[kkkk[kk]].x); 
            col_y.push(collect_center[kkkk[kk]].y); 

            if(kk == 11)
            {

             /*
              * collect new point at function in array name avg_arr[A-H][0-11] 
              */
              findLineByLeastSquares(col_y,col_x,k); // .ใส่สลับแกนกันนะ

              col_x = [];
              result_values_x = [];
              result_values_y = [];

              }
            }          
          }

          /**********
          *After Regression. Collect in new array   
          ************/
         for (k in avg_arr)  //A-H , 0-7
         {
          countb++;
          var collect_center2 = [];
          // var ko = avg_arr[k];
          for (kk in avg_arr[k][1]) 
          {
            var des:any = [...avg_arr[k][1]] 
            var pointer_des:any = des[0]
            var length_p = pointer_des.x.length ; 
            // console.log("des",pointer_des);           //pointer_des = pointer x and y
            // console.log("des.x",pointer_des.x);       //Array [12] in  A-H Column
            for (let i = 0; i < length_p ; i++) 
            {
              // console.log("des.x",i,"is",pointer_des.x[i]); // x[0] 0-11
              // console.log("des.x",i,"is",pointer_des.y[i]); // x[0] 0-11 
              let pot_off_fun = new cv.Point(pointer_des.x[i],pointer_des.y[i]);
              collect_center2.push(pot_off_fun);
            }
            avg_arr[k].push(collect_center2);
            // console.log("des.x[arr]",pointer_des.x[1]); // x[0] 0-11
            // console.log("des.x[arr]",pointer_des.y[1]); // x[0] 0-11
          }
        }

          /********** 
           *end draw new circle
          **********/

      } 

      // console.log("1 , 2",avg_arr[1][0]); // [1] = a-h / 0-7, [0] = at 0 /* show 1*/ */ 
      // console.log("1 , 2",avg_arr[1][1]); // [1] = a-h / 0-7,[1] = pointer {x,y} 
  //     console.log("[1][2][0]",avg_arr[1][2][0]); //[2] = point, [0] 0 - 11 = first center in 
  //     console.log("[1][2][0]",avg_arr[1][2][11]); // [2] = point,[0] 0 - 11 = first center in 
  //     console.log(length_p);
  //     console.log(countb);

      drawcircle(avg_arr);

      function drawcircle (arr_col :any[])
      {
        for (let k2 = 0; k2 < countb; k2++) 
        {
        //console.log("[k2]",arr_col[k2]);
          for (let k3 = 0; k3 < length_p; k3++) 
          {
       //console.log("[k2][2][k3]",arr_col[k2][2][k3]);
            cv.circle(displayMat, arr_col[k2][2][k3], sum_radious_result,color, 1);
          }
        }
      }
    }

    function findLineByLeastSquares(values_x : any, values_y : any,countsss : any) 
    {
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var count = 0;
  
      /*
        * We'll use those variables for faster read/write access.
        */
      var x = 0;
      var y = 0;
      var values_length = values_x.length;
  
      if (values_length != values_y.length) {
          throw new Error('The parameters values_x and values_y need to have same size!');
      }
  
      /*
        * Nothing to do.
        */
      if (values_length === 0) {
          return [ [], [] ];
      }
  
      /*
        * Calculate the sum for each of the parts necessary.
        */
      for (let v = 0; v < values_length; v++) 
      {
          x = values_x[v];
          y = values_y[v];
          sum_x += x;
          sum_y += y;
          sum_xx += x*x;
          sum_xy += x*y;
          count++;
      }
  
      /*
        * Calculate m and b for the formular:
        * y = x * m + b
        */
      var m : number = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
      var b: number = (sum_y/count) - (m*sum_x)/count;

      /*
        * We will make the x and y result line now
        */
  
      for (let v = 0; v < values_length; v++) 
      {
          x = values_x[v];
          y = x * m + b;
          // console.log("x",x);
          // console.log("y",y);
          result_values_x.push(x);
          result_values_y.push(y);
      }
      let point_in_fun = new cv.Point(result_values_y,result_values_x);
      avg_arr[countsss].push([point_in_fun]);
      console.log(countsss);
      return [result_values_x, result_values_y];

    // /// * draw new circle
    // for (let i = 0; i < collect_radius.length ; ++i) 
    // {          
    //   cv.circle(displayMat, collect_center[i], sum_radious_result, [0, 0, 0, 255], 3);
    // }/// * end draw new circle

    ///**  find new point for draw new circle   */   
    // console.log("column_E",column_E)  
    // for (let i = 0; i < Collect_column.length; i++) 
    // {
    //   for (let j = 0; j < Collect_column[i].length; j++) {
    //     // const element = array[j];
        
    //   }
    //   const sum_avg_minmax = (min_max_arr[i][2]-min_max_arr[i][1])/(Collect_column.length+1);
    //   const res_minmax = min_max_arr[i][1] + sum_avg_minmax*(i+1)
    //   console.log("i",Collect_column[i])
    //   console.log("res_minmax",res_minmax)
    //   console.log("sum_avg_minmax",sum_avg_minmax)

    // }
    

      
    }

    function predefined1 (image2)
    {
      let gray = new cv.Mat();
      let opening = new cv.Mat();
      let coinsBg = new cv.Mat();
      //let distTrans = new cv.Mat();
      cv.cvtColor(image2, gray, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
      let ksize = new cv.Size(5, 5);
      let anchor = new cv.Point(-1, -1);
      //let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8U);
      let M = cv.Mat.ones(5, 5, cv.CV_8U);
      cv.blur(gray, gray, ksize, anchor, cv.BORDER_DEFAULT);
      cv.dilate(gray, opening, M);
      cv.dilate(opening, coinsBg, M, new cv.Point(-1, -1), 10);
      
      cv.threshold(coinsBg, coinsBg, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
    
      //
      
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();   
      
      // let displayMat = dst.clone(); // get result img name *dst 
      let displayMat = coinsBg.clone(); // get result img name *dst 
      // return coinsBg
      // bounding rect
  
      cv.findContours(displayMat, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      let cnt = contours.get(0);
      let rotatedRect = cv.minAreaRect(cnt);
      let vertices = cv.RotatedRect.points(rotatedRect);
      let contoursColor = new cv.Scalar(255, 255, 255);
      let rectangleColor = new cv.Scalar(123, 255, 125);
      cv.drawContours(displayMat, contours, 0, contoursColor, 1, 8, hierarchy, 100);
      // You can try more different parameters
      for (let i = 0; i < 4; i++) 
      {
        cv.line(displayMat, vertices[i], vertices[(i + 1) % 4], rectangleColor, 2, cv.LINE_AA, 0);
      // cv.line(displayMat, vertices[i], vertices[(i + 1) % 4], rectangleColor, 4 = size of line, cv.LINE_AA, 0);
      }
    }

    return displayMat
      

}
  bufferToBase64(mat){
    let canvas=document.createElement('canvas')
    if(!(mat instanceof cv.Mat)){
     throw new Error("Please input the valid cv.Mat instance.");
    }
    var img=new cv.Mat;
    var depth=mat.type()%8;
    var scale=depth<=cv.CV_8S?1:depth<=cv.CV_32S?1/256:255;
    var shift=depth===cv.CV_8S||depth===cv.CV_16S?128:0;
    mat.convertTo(img,cv.CV_8U,scale,shift);
    switch(img.type()){
     case cv.CV_8UC1:cv.cvtColor(img,img,cv.COLOR_GRAY2RGBA);
      break;
     case cv.CV_8UC3:cv.cvtColor(img,img,cv.COLOR_RGB2RGBA);
      break;
     case cv.CV_8UC4:break;
    default:throw new Error("Bad number of channels (Source image must     have 1, 3 or 4 channels)");
    }
    var imgData=new ImageData(new Uint8ClampedArray(img.data),img.cols,img.rows);
    var ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.width=imgData.width;
    canvas.height=imgData.height;
    ctx.putImageData(imgData,0,0);
    return canvas.toDataURL("image/png")
  }
}

