var canvas;
var gl;

var bufferNum1, bufferNum2, vertices
var vPosition;
var transformationMatrix, transformationMatrixLoc;
var number=3

var objX=0.0;
var objY=0.0;
var scaleX=1;
var scaleY=1;
var rotation=0;
var redSlider=1.00;
var greenSlider=0.00;
var blueSlider=0.00;
var opacity=1.00;

var indices=[
 4,0,5,1,6,2,7,3,6,7,10,11,14,15,18,19,22,23,18,22,21,18,17,20,16,20,21,16,17,12,13,8,9,4,5, //35
   2,3,6,7,10,11,14,15,18,19,22,23,// 47
  0,3,7,4,6,7,15,14,11,15,12,8,9,8,20,21,16,20,23,19,//67
  0,3,7,4,2,3,23,22,19,23,20,16,11,15,12,8, // 83
  0,12,13,1,9,13,15,11,2,22,23,3, //95
  0,4,7,3,0,12,13,1,8,12,15,11,10,11,23,22,19,23,20,16, //115
  0,4,7,3,0,20,21,1,16,20,23,19,10,22,23,11,8,12,15,11, //135
  0,4,7,3,2,22,23,3,  //143
  0,4,7,3,0,20,21,1,16,20,23,19,2,22,23,3,8,12,15,11, //163
  0,4,7,3,2,22,23,3,8,12,15,11,0,12,13,1,16,20,23,19 //183
   
   ]


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Make the numbers
     num1vertices = [
	   vec2(-0.35, 0.25),vec2(-0.25, 0.25),vec2(-0.15, 0.25),vec2(-0.05, 0.25),
	   vec2(-0.35, 0.15),vec2(-0.25, 0.15),vec2(-0.15, 0.15),vec2(-0.05, 0.15),
	   vec2(-0.35, 0.05),vec2(-0.25, 0.05),vec2(-0.15, 0,05),vec2(-0.05, 0.05),
	   vec2(-0.35,-0.05),vec2(-0.25,-0.05),vec2(-0.15,-0.05),vec2(-0.05,-0.05),
	   vec2(-0.35,-0.15),vec2(-0.25,-0.15),vec2(-0.15,-0.15),vec2(-0.05,-0.15),
	   vec2(-0.35,-0.25),vec2(-0.25,-0.25),vec2(-0.15,-0.25),vec2(-0.05,-0.25)
	   
	   
 ];
      num2vertices = [
	   vec2(0.05, 0.25),vec2(0.15, 0.25),vec2(0.25, 0.25),vec2(0.35, 0.25),
	   vec2(0.05, 0.15),vec2(0.15, 0.15),vec2(0.25, 0.15),vec2(0.35, 0.15),
	   vec2(0.05, 0.05),vec2(0.15, 0.05),vec2(0.25, 0,05),vec2(0.35, 0.05),
	   vec2(0.05,-0.05),vec2(0.15,-0.05),vec2(0.25,-0.05),vec2(0.35,-0.05),
	   vec2(0.05,-0.15),vec2(0.15,-0.15),vec2(0.25,-0.15),vec2(0.35,-0.15),
	   vec2(0.05,-0.25),vec2(0.15,-0.25),vec2(0.25,-0.25),vec2(0.35,-0.25)
	   
	   
 ];


	//TODO: create and load geometry
	var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
	

   // Load the data into the GPU
    bufferNum1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num1vertices), gl.STATIC_DRAW );
    // Load the data into the GPU
    bufferNum2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num2vertices), gl.STATIC_DRAW );
	

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
    colorLoc=gl.getUniformLocation(program,"color");
    transformationMatrixLoc = gl.getUniformLocation( program, "transformationMatrix" );

	document.getElementById("inp_number").oninput = function(event) {
        //TODO: fill here to adjust number to display input value
		number=event.srcElement.value;
    };
	
    document.getElementById("inp_objX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
		objX=event.srcElement.value;
		
    };
    document.getElementById("inp_objY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
		objY=event.srcElement.value;
		
    };
    document.getElementById("inp_obj_scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
		scaleX=event.srcElement.value;
		
    };
    document.getElementById("inp_obj_scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
		scaleY=event.srcElement.value;
    };
    document.getElementById("inp_rotation").oninput = function(event) {
        //TODO: fill here to adjust rotation according to slider 
		rotation=event.srcElement.value;
		
    };
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
		redSlider=event.srcElement.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
		greenSlider=event.srcElement.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
		blueSlider=event.srcElement.value;
    };

    render();

};


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );
    
	//TODO: send color to shader
	//TODO: calculate and send transformation matrix
	//TODO: draw digits
	//gl.uniform4fv(colorLoc,vec4(redSlider,greenSlider,blueSlider,opacity));
	gl.uniform4fv(colorLoc, vec4(redSlider, greenSlider, blueSlider, opacity));
    transformationMatrix = mat4();
	
	transformationMatrix = mult(transformationMatrix, translate(objX, objY, 0.0));
    transformationMatrix = mult(transformationMatrix, rotate(rotation, 0, 0, 1));
    transformationMatrix = mult(transformationMatrix, scalem(scaleX, scaleY, 0));
	
    gl.uniformMatrix4fv( transformationMatrixLoc, false, flatten(transformationMatrix) );
   
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	
	 if (number>=0 && number<10){
	gl.drawElements( gl.TRIANGLE_STRIP, 35, gl.UNSIGNED_BYTE,0);
	}else if(number>=10 && number<20){
	gl.drawElements( gl.TRIANGLE_STRIP,12, gl.UNSIGNED_BYTE,35);
	}
	else if(number>=20 && number<30){
	for(var i = 47; i < 67; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i)
	}
	else if(number>=30 && number<40){
	for(var i = 67; i < 83; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number>=40 && number<50){
	for(var i = 83; i < 95; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number>=50 && number<60){
	for(var i = 95; i < 115; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number>=60 && number<70){
	for(var i = 115; i < 135; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number>=70 && number<80){
	for(var i = 135; i < 143; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number>=80 && number<90){
	for(var i = 143; i < 163; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number>=90 && number<100){
	for(var i = 163; i < 183; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
    
	
	 
	
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	
	
    
  if (number%10==0){
	gl.drawElements( gl.TRIANGLE_STRIP, 35, gl.UNSIGNED_BYTE,0);
	}else if(number%10==1){
	gl.drawElements( gl.TRIANGLE_STRIP,12, gl.UNSIGNED_BYTE,35);
	}
	else if(number%10==2){
	for(var i = 47; i < 67; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i)
	}
	else if(number%10==3){
	for(var i = 67; i < 83; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number%10==4){
	for(var i = 83; i < 95; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number%10==5){
	for(var i = 95; i < 115; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
	}
	else if(number%10==6){
	for(var i = 115; i < 135; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number%10==7){
	for(var i = 135; i < 143; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number%10==8){
	for(var i = 143; i < 163; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	else if(number%10==9){
	for(var i = 163; i < 183; i += 4)
   gl.drawElements( gl.TRIANGLE_FAN, 4, gl.UNSIGNED_BYTE,i )
    }
	
	

    window.requestAnimFrame(render);
}
