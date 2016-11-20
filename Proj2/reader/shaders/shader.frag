#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float du;
uniform float dv;

uniform float su;
uniform float sv;

uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;

void main(){
  vec4 color = texture2D(uSampler, vTextureCoord);

  if ((vTextureCoord.x > (su/du)) && (vTextureCoord.x < ((su+1.0)/du)) && ((1.0 - vTextureCoord.y) > (sv/dv)) && ((1.0 - vTextureCoord.y) < ((sv+1.0)/dv)))
     color.rgba *= cs;
   else if ((mod(du*vTextureCoord.x,2.0) < 1.0) ^^ (mod(dv*vTextureCoord.y,2.0) < 1.0))
     color.rgba *= c1;
   else
     color.rgba *= c2;

  gl_FragColor = color;
}
