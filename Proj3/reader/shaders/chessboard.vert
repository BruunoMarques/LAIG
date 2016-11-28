attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float du;
uniform float dv;

uniform float su;
uniform float sv;

void main(){
  //get the position of fragment on the board
  if ((aTextureCoord.x > (su/du)) && (aTextureCoord.x < ((su+1.0)/du)) && ( (1.0 - aTextureCoord.y) > (sv/dv)) && ((1.0 - aTextureCoord.y) < ((sv+1.0)/dv)))
   {
         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y , aVertexPosition.z + 0.05, 1.0);
   }
   else{
       gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
   }

  vTextureCoord = aTextureCoord;
}
