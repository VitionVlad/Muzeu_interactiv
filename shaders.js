const standartFragmentShadergbr = `#version 300 es
precision mediump float;
layout (location = 0) out vec4 color;
in vec2 xy;
in vec3 norm;
in float dep;
uniform sampler2D albedo;
uniform sampler2D specular;
uniform sampler2D normal;
uniform sampler2D shadow;
uniform vec3 lightp[5];
uniform vec3 lightc[5];
uniform int lightt[5];
uniform vec3 ppos;
in vec3 posit;
in mat3 tbn;
uniform samplerCube cubemap;

const float constant = 1.0;
const float linear = 0.09;
const float quadratic = 0.016;

in vec4 str;

float shadowMapping(){
    vec3 projected = str.xyz / str.w;
    float fshadow = 0.0f;
    if(projected.z <= 1.0f){ 
     projected = (projected + 1.0f)/2.0f; 
     if(projected.x > 1.0 || projected.x < -1.0 || projected.y > 1.0 || projected.y < -1.0){
        return 0.0;
     }
     float closestDepth = texture(shadow, projected.xy).r; 
     float currentDepth = projected.z; 
     if(currentDepth > closestDepth){ 
      fshadow+=1.0f;
     } 
    } 
    return fshadow; 
  } 

void main(){
    vec3 finalcolor = vec3(0);
    vec3 normal = normalize(norm);
    for(int i = 0; i!=5; i++){
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * lightc[i];
        vec3 lightDir;
        if(lightt[i] == 0){
            lightDir = normalize(lightp[i] - posit);
        }else{
            lightDir = normalize(lightp[i]);
        }
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * lightc[i];

        float specularStrength = texture(specular, xy).r;
        vec3 viewDir = normalize(vec3(-ppos.x, -ppos.y, -ppos.z) - posit);
        vec3 reflectDir = reflect(-lightDir, normal);  
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specu = specularStrength * spec * lightc[i];  

        if(lightt[i] == 0){
            float distance = length(lightp[i] - posit);
            float attenuation = 1.0 / (constant + linear * distance + quadratic * (distance * distance)); 
            ambient  *= attenuation; 
            diffuse  *= attenuation;
            specu *= attenuation;     
        }

        finalcolor += ((diffuse + specu)*(1.0-shadowMapping())+ambient) * texture(albedo, xy).gbr;
    }
    vec3 I = normalize(posit - -ppos);
    vec3 R = reflect(I, normal);
    color = vec4(mix(finalcolor, texture(cubemap, R).gbr, texture(specular, xy).r/5.0), 1);
}
`;

const pstandartFragmentShadergbr = `#version 300 es
precision mediump float;
layout (location = 0) out vec4 color;
in vec2 xy;
in vec3 norm;
in float dep;
uniform sampler2D albedo;
uniform sampler2D specular;
uniform sampler2D normal;
uniform sampler2D shadow;
uniform vec3 lightp[5];
uniform vec3 lightc[5];
uniform int lightt[5];
uniform vec3 ppos;
in vec3 posit;
in mat3 tbn;
uniform samplerCube cubemap;

const float constant = 1.0;
const float linear = 0.09;
const float quadratic = 0.016;

in vec4 str;

void main(){
    vec3 finalcolor = vec3(0);
    vec3 normalv = normalize(norm);
    for(int i = 0; i!=5; i++){
        float ambientStrength = 0.3;
        vec3 ambient = ambientStrength * lightc[i];
        vec3 lightDir;
        if(lightt[i] == 0){
            lightDir = normalize(lightp[i] - posit);
        }else{
            lightDir = normalize(lightp[i]);
        }
        float diff = max(dot(normalv, lightDir), 0.0);
        vec3 diffuse = diff * lightc[i];

        float specularStrength = texture(specular, xy).r;
        vec3 viewDir = normalize(vec3(-ppos.x, -ppos.y, -ppos.z) - posit);
        vec3 reflectDir = reflect(-lightDir, normalv);  
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specu = specularStrength * spec * lightc[i];  

        if(lightt[i] == 0){
            float distance = length(lightp[i] - posit);
            float attenuation = 1.0 / (constant + linear * distance + quadratic * (distance * distance)); 
            ambient  *= attenuation; 
            diffuse  *= attenuation;
            specu *= attenuation;     
        }

        if(texture(albedo, xy).r >= 0.99 && texture(albedo, xy).g >= 0.99 && texture(albedo, xy).b >= 0.99){
            finalcolor += ((diffuse + specu)+ambient) * texture(normal, xy).gbr;
        }else{
            finalcolor += ((diffuse + specu)+ambient) * texture(albedo, xy).gbr;
        }
    }
    vec3 I = normalize(posit - -ppos);
    vec3 R = reflect(I, normalv);
    color = vec4(mix(finalcolor, texture(cubemap, R).gbr, texture(specular, xy).r/5.0), 1);
}
`;

const SkyboxShaderFragment = `#version 300 es
precision mediump float;
layout (location = 0) out vec4 color;
in vec2 xy;
in vec3 norm;
in float dep;
uniform sampler2D albedo;
uniform sampler2D specular;
uniform sampler2D normal;
uniform sampler2D shadow;
uniform samplerCube cubemap;
uniform vec3 lightp[5];
uniform vec3 lightc[5];
uniform int lightt[5];
uniform float additionalvalue;
uniform vec3 ppos;
in vec3 posit;

void main(){
    vec3 finalcol;
    if(additionalvalue <= 1.0){
        finalcol = texture(cubemap, posit).gbr;
    }else{
        finalcol = vec3(texture(cubemap, posit).g, 0.5, 0.5);
    }
    color = vec4(finalcol, 1);
}
`;

const flippedVertexShader = `#version 300 es

in vec3 positions;
in vec3 normals;
in vec2 uv;
in vec3 ntangent;

uniform mat4 proj;
uniform mat4 trans;
uniform mat4 rotx;
uniform mat4 roty;

uniform mat4 mtrans;
uniform mat4 mrotx;
uniform mat4 mroty;
uniform mat4 mrotz;
uniform mat4 mscale;

uniform mat4 sproj;
uniform mat4 strans;
uniform mat4 srotx;
uniform mat4 sroty;

out vec2 xy;
out vec3 norm;
out float dep;
out vec3 posit;
out vec4 str;
out mat3 tbn;
void main(){
    vec4 fin = mscale * vec4(positions, 1.0);
    fin = mtrans * mroty * mrotx * mrotz * fin;
    posit = fin.xyz;
    fin = proj * roty * rotx * trans * fin;
    gl_Position = fin;
    fin = mscale * vec4(positions, 1.0);
    fin = mtrans * mroty * mrotx * mrotz * fin;
    fin = sproj * sroty * srotx * strans * fin;
    str = fin;
    dep = fin.z;
    xy = vec2(uv.x, uv.y+1.0);
    norm = normals;
    mat3 vTBN = transpose(mat3(
        normalize(ntangent),
        normalize(cross(normals, ntangent)),
        normalize(normals)
    ));
    tbn = vTBN;
}
`;