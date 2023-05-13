var locked = false;

function dist(v1, v2){
    return Math.sqrt(((v2.x-v1.x)*(v2.x-v1.x))+((v2.y-v1.y)*(v2.y-v1.y))+((v2.z-v1.z)*(v2.z-v1.z)));
}

function main(){
    document.body.style.cursor = 'none';
    const speed = 0.1;
    const sensivity = 1;
    var eng = new Engine("#glcanvas", standartPostProces, true, true, 4000);
    eng.pos.z = -1.0;
    eng.pos.y = -2.7;
    eng.rot.x = 0.0;
    eng.rot.y = 0.0;

    eng.useorthosh = true;
    eng.sfar = 200.0;
    eng.sfov = 15.0;
    eng.shadowpos.z = -20.0;
    eng.shadowpos.y = -80.7;
    eng.shadowrot.y = 0.7;
    eng.far = 39;
    eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
    function key_callback(){
        document.addEventListener('keydown', function(event) {
            if (event.key == "w" || event.key == "W") {
                eng.pos.z += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.x -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "a" || event.key == "A") {
                eng.pos.x += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.z += Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "s" || event.key == "S") {
                eng.pos.z -= Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.x += Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "d" || event.key == "D") {
                eng.pos.x -= Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.z -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "1") {
                console.log(eng.pos.x+" "+eng.pos.y+" "+eng.pos.z+" "+eng.rot.x+" "+eng.rot.y);
            }
        }, true);
    }
    function mousecallback(){
        document.addEventListener("mousemove", function(event){
            eng.rot.x += ((event.movementX) / (eng.gl.canvas.width/2))/sensivity;
            eng.rot.y += ((event.movementY) / (eng.gl.canvas.height/2))/sensivity;
            if(eng.rot.y > 1.5){
                eng.rot.y = 1.5;
            }
            if(eng.rot.y < -1.5){
                eng.rot.y = -1.5;
            }
        }, false);     
        document.getElementById("glCanvas").onclick = function(){
            document.getElementById("glCanvas").requestPointerLock();
            document.getElementById("glCanvas").requestFullscreen();
        };
    }

    var resolution = new vec2(eng.canvas.width, eng.canvas.height);
    var x, y;
    var stillt = false;
    var touchHandler = function(event) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    var begtouch = function(event) {
        stillt = true;
    }
    var endtouch = function(event) {
        stillt = false;
    }
    eng.canvas.addEventListener("touchmove", touchHandler);
    eng.canvas.addEventListener("touchstart", begtouch);
    eng.canvas.addEventListener("touchend", endtouch);
    
    mousecallback();
    key_callback();
    function touchhandle(){
        var touchpos = new vec2(x, y);
        if(stillt === true){
            if(touchpos.x < resolution.x/2){
                eng.pos.z += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * (((((-touchpos.y/resolution.y)*2) +1)*0.01)*2)*2;
                eng.pos.x -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * (((((-touchpos.y/resolution.y)*2) +1)*0.01)*2)*2;
            }else if(touchpos.x > resolution.x/2){
                eng.rot.x += (((((touchpos.x/resolution.x)-0.5)*2)*2)-1)/100;
                eng.rot.y -= ((((-touchpos.y/resolution.y)*2) +1)*0.01);
            }
        }
    }

    var cubem = new cubeMap(right, left, ttop, bottom, back, front, 512, 512, eng);
    var skybox = new Mesh(skyv, skyn, skyu, SkyboxShaderFragment, standartSkyboxShaderVertex, eng, null, null, null, 1, 1, false, cubem);
    skybox.cullmode = eng.gl.FRONT;
    skybox.rot.y = 3.0;
    skybox.scale.x = 1000;
    skybox.scale.y = 1000;
    skybox.scale.z = 1000;

    var ww = new Array(95);

    ww[0] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[1] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[1].pos.z = -20;
    ww[2] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[2].pos.z = -40;
    ww[3] = new Mesh(battlev, battlen, battleu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[3].pos.z = -59;
    ww[4] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[4].pos.z = -79;

    ww[5] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, capit, null, paptex, 512, 512, true, cubem);
    ww[5].pos.z = -54;
    ww[5].pos.y = 1.5;
    ww[5].pos.x = -7.2;
    ww[5].rot.x = -1.5708;
    ww[5].rot.y = -1.5708;

    ww[6] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, pacparis, null, paptex, 512, 512, true, cubem);
    ww[6].pos.z = -58;
    ww[6].pos.y = 1.5;
    ww[6].pos.x = -7;
    ww[6].rot.x = -1.5708;
    ww[6].rot.y = -1.5708;

    ww[7] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, pierd, null, paptex, 512, 512, true, cubem);
    ww[7].pos.z = -62;
    ww[7].pos.y = 1.5;
    ww[7].pos.x = -7;
    ww[7].rot.x = -1.5708;
    ww[7].rot.y = -1.5708;

    ww[8] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, inter1, null, paptex, inter1x, inter1y, true, cubem);
    ww[8].pos.z = -60;
    ww[8].pos.y = 1.5;
    ww[8].pos.x = -7.1;
    ww[8].rot.x = -1.5708;
    ww[8].rot.y = -1.5708;

    ww[9] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, inter2, null, paptex, inter2x, inter2y, true, cubem);
    ww[9].pos.z = -64;
    ww[9].pos.y = 1.5;
    ww[9].pos.x = -7.1;
    ww[9].rot.x = -1.5708;
    ww[9].rot.y = -1.5708;

    ww[10] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, inter3, null, paptex, inter3x, inter3y, true, cubem);
    ww[10].pos.z = -56;
    ww[10].pos.y = 1.5;
    ww[10].pos.x = -7.2;
    ww[10].rot.x = -1.5708;
    ww[10].rot.y = -1.5708;

    ww[11] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, map1, null, paptex, map1x, map1y, true, cubem);
    ww[11].pos.z = -54;
    ww[11].pos.y = 1.5;
    ww[11].pos.x = 7.2;
    ww[11].scale.x = 1.5708;
    ww[11].rot.x = -1.5708;
    ww[11].rot.y = 1.5708;
    ww[11].shadowcullmode = eng.gl.BACK;
    //ww[11].cullmode = eng.gl.FRONT;

    ww[12] = new Mesh(markvv, markvn, markvu, standartFragmentShadergbr, standartVertexShader, eng, markv, null, null, markvx, markvy, true, cubem);
    ww[12].pos.z = -64;
    ww[12].pos.y = 1.5;
    ww[12].pos.x = 7.2;

    var interbelic = new Array(50);
    interbelic[0] = new Mesh(streetv, streetn, streetu, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[0].pos.z = -99;
    interbelic[1] = new Mesh(streetv, streetn, streetu, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[1].pos.z = -99;
    interbelic[1].pos.x = 10;
    interbelic[2] = new Mesh(streetv, streetn, streetu, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[2].pos.z = -99;
    interbelic[2].pos.y = 3;
    interbelic[3] = new Mesh(streetv, streetn, streetu, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[3].pos.z = -99;
    interbelic[3].pos.x = 10;
    interbelic[3].pos.y = 3;

    interbelic[4] = new Mesh(g1v, g1n, g1u, standartFragmentShadergbr, flippedVertexShader, eng, inter, null, null, interx, intery, true, cubem);
    interbelic[4].pos.z = -109;
    interbelic[4].pos.x = -2.7;
    interbelic[4].rot.x = -1.56;
    interbelic[4].pos.y = 1.5;
    interbelic[4].scale.z = 2;
    interbelic[4].scale.x = 1.5;

    interbelic[5] = new Mesh(g2v, g2n, g2u, standartFragmentShadergbr, flippedVertexShader, eng, null, null, null, interx, intery, true, cubem);
    interbelic[5].pos.z = -109;
    interbelic[5].pos.x = -2.7;
    interbelic[5].rot.x = -1.56;
    interbelic[5].pos.y = 1.5;
    interbelic[5].scale.z = 2;
    interbelic[5].scale.x = 1.5;

    interbelic[6] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[6].pos.z = -99;
    interbelic[6].pos.x = -5;
    interbelic[6].scale.y = 2;

    interbelic[7] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[7].pos.z = -99;
    interbelic[7].pos.x = 15;
    interbelic[7].scale.y = 2;

    interbelic[8] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, gi, null, paptex, 512, 512, true, cubem);
    interbelic[8].pos.z = -109;
    interbelic[8].pos.x = 1.05;
    interbelic[8].rot.x = -1.56;
    interbelic[8].pos.y = 1.5;
    interbelic[8].scale.z = 1.5;
    interbelic[8].scale.x = 1.5;

    interbelic[9] = new Mesh(u1v, u1n, u1u, standartFragmentShadergbr, flippedVertexShader, eng, inter, null, null, interx, intery, true, cubem);
    interbelic[9].pos.z = -109;
    interbelic[9].pos.x = 4.8;
    interbelic[9].rot.x = -1.56;
    interbelic[9].pos.y = 1.5;
    interbelic[9].scale.z = 2;
    interbelic[9].scale.x = 1.5;

    interbelic[10] = new Mesh(u2v, u2n, u2u, standartFragmentShadergbr, flippedVertexShader, eng, null, null, null, interx, intery, true, cubem);
    interbelic[10].pos.z = -109;
    interbelic[10].pos.x = 4.8;
    interbelic[10].rot.x = -1.56;
    interbelic[10].pos.y = 1.5;
    interbelic[10].scale.z = 2;
    interbelic[10].scale.x = 1.5;

    interbelic[11] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, ui, null, paptex, 512, 512, true, cubem);
    interbelic[11].pos.z = -109;
    interbelic[11].pos.x = 8.55;
    interbelic[11].rot.x = -1.56;
    interbelic[11].pos.y = 1.5;
    interbelic[11].scale.z = 1.5;
    interbelic[11].scale.x = 1.5;

    interbelic[12] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[12].pos.z = -89;
    interbelic[12].pos.x = 11;
    interbelic[12].scale.y = 2;
    interbelic[12].scale.z = 0.5;
    interbelic[12].rot.y = 1.56;

    interbelic[13] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, dep, null, paptex, depx, depy, true, cubem);
    interbelic[13].pos.z = -102;
    interbelic[13].pos.y = 1.5;
    interbelic[13].pos.x = -4.8;
    interbelic[13].rot.x = -1.56;
    interbelic[13].rot.y = -1.56;

    interbelic[14] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, anc, null, paptex, ancx, ancy, true, cubem);
    interbelic[14].pos.z = -104;
    interbelic[14].pos.y = 1.5;
    interbelic[14].pos.x = -4.8;
    interbelic[14].rot.x = -1.56;
    interbelic[14].rot.y = -1.56;

    interbelic[15] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, mun, null, paptex, munx, muny, true, cubem);
    interbelic[15].pos.z = -106;
    interbelic[15].pos.y = 1.5;
    interbelic[15].pos.x = -4.8;
    interbelic[15].rot.x = -1.56;
    interbelic[15].rot.y = -1.56;

    interbelic[16] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, mrp, null, paptex, mrpx, mrpy, true, cubem);
    interbelic[16].pos.z = -108;
    interbelic[16].pos.y = 1.5;
    interbelic[16].pos.x = -4.8;
    interbelic[16].rot.x = -1.5708;
    interbelic[16].rot.y = -1.5708;

    interbelic[17] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[17].pos.z = -109.15;
    interbelic[17].pos.x = 2;
    interbelic[17].scale.y = 2;
    interbelic[17].scale.z = 0.8;
    interbelic[17].rot.y = 1.5708;

    interbelic[18] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[18].pos.z = -94;
    interbelic[18].pos.x = 6;
    interbelic[18].scale.z = 0.5;
    interbelic[18].scale.y = 2;

    interbelic[19] = new Mesh(fencev, fencen, fenceu, standartFragmentShadergbr, standartVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    interbelic[19].pos.z = -99;
    interbelic[19].pos.x = 11;
    interbelic[19].scale.y = 2;
    interbelic[19].scale.z = 0.5;
    interbelic[19].rot.y = 1.56;

    interbelic[20] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, axa, null, paptex, 512, 512, true, cubem);
    interbelic[20].pos.z = -98;
    interbelic[20].pos.y = 1.5;
    interbelic[20].pos.x = 5.8;
    interbelic[20].rot.x = -1.5708;
    interbelic[20].rot.y = 1.5708;

    ww[13] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[13].pos.z = -119;
    ww[13].pos.x = 12.5;

    ww[14] = new Mesh(flaggv, flaggn, flaggu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[14].pos.z = -126;
    ww[14].pos.x = 8.6;
    ww[14].pos.y = 1;

    ww[15] = new Mesh(flagpv, flagpn, flagpu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[15].pos.z = -126;
    ww[15].pos.x = 16.8;
    ww[15].pos.y = 1;

    ww[16] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[16].pos.z = -139;
    ww[16].pos.x = 12.5;

    ww[17] = new Mesh(panzer1v, panzer1n, panzer1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, true, cubem);
    ww[17].pos.z = -139;
    ww[17].pos.x = 0;
    ww[17].pos.y = 1.5;
    ww[17].rot.y = -1.5708;

    ww[18] = new Mesh(panzer1v, panzer1n, panzer1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, true, cubem);
    ww[18].pos.z = -146;
    ww[18].pos.x = -3;
    ww[18].pos.y = 1.5;
    ww[18].rot.y = -1.5708;

    ww[19] = new Mesh(panzer1v, panzer1n, panzer1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, true, cubem);
    ww[19].pos.z = -153;
    ww[19].pos.x = -6;
    ww[19].pos.y = 1.5;
    ww[19].rot.y = -1.5708;

    ww[20] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[20].pos.z = -159;
    ww[20].pos.x = 12.5;

    ww[21] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, q1sep, null, paptex, 512, 512, true, cubem);
    ww[21].pos.z = -159;
    ww[21].pos.y = 1.5;
    ww[21].pos.x = 16.8;
    ww[21].rot.x = -1.5708;
    ww[21].rot.y = 1.5708;
    ww[21].shadowcullmode = eng.gl.BACK;

    ww[22] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[22].pos.z = -179;
    ww[22].pos.x = 12.5;

    ww[23] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[23].pos.z = -199;
    ww[23].pos.x = 12.5;

    ww[24] = new Mesh(eifelv, eifeln, eifelu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([140, 129, 152, 255]), parks, null, 1, 1, false, cubem);
    ww[24].pos.z = -199;
    ww[24].pos.x = 12.5;

    ww[25] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, infopan, null, paptex, 512, 512, true, cubem);
    ww[25].pos.z = -199;
    ww[25].pos.y = 1.5;
    ww[25].pos.x = 16.8;
    ww[25].rot.x = -1.5;
    ww[25].rot.y = 1.5708;
    ww[25].shadowcullmode = eng.gl.BACK;

    ww[26] = new Mesh(flaggv, flaggn, flaggu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[26].pos.z = -196;
    ww[26].pos.x = 8.6;
    ww[26].pos.y = 1;

    ww[27] = new Mesh(flagfv, flagfn, flagfu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[27].pos.z = -199;
    ww[27].pos.x = 8.6;
    ww[27].pos.y = 1;

    ww[28] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, frc, null, paptex, 512, 512, true, cubem);
    ww[28].pos.z = -204;
    ww[28].pos.y = 1.5;
    ww[28].pos.x = 16.8;
    ww[28].rot.x = -1.5;
    ww[28].rot.y = 1.5708;
    ww[28].shadowcullmode = eng.gl.BACK;

    ww[29] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[29].pos.z = -219;
    ww[29].pos.x = 12.5;

    ww[30] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[30].pos.z = -239;
    ww[30].pos.x = 12.5;

    ww[31] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[31].pos.z = -259;
    ww[31].pos.x = 12.5;

    ww[32] = new Mesh(bigbenv, bigbenn, bigbenu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([140, 129, 152, 255]), parks, null, 1, 1, false, cubem);
    ww[32].pos.z = -229;
    ww[32].pos.x = -12.5;
    ww[32].pos.y = -12.5;

    ww[33] = new Mesh(flagbv, flagbn, flagbu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[33].pos.z = -229;
    ww[33].pos.x = 8.6;
    ww[33].pos.y = 1;

    ww[34] = new Mesh(flaggv, flaggn, flaggu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[34].pos.z = -229;
    ww[34].pos.x = 16.8;
    ww[34].pos.y = 1;

    ww[35] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, hp, null, paptex, 512, 512, true, cubem);
    ww[35].pos.z = -209;
    ww[35].pos.y = 1.5;
    ww[35].pos.x = 16.8;
    ww[35].rot.x = -1.5;
    ww[35].rot.y = 1.5708;
    ww[35].shadowcullmode = eng.gl.BACK;

    ww[36] = new Mesh(mess1v, mess1n, mess1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, false, cubem);
    ww[36].pos.z = -255;
    ww[36].pos.x = 40;
    ww[36].pos.y = 100;
    ww[36].rot.y = -1.5708;

    ww[37] = new Mesh(mess1v, mess1n, mess1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, false, cubem);
    ww[37].pos.z = -270;
    ww[37].pos.x = 45;
    ww[37].pos.y = 100;
    ww[37].rot.y = -1.5708;

    ww[38] = new Mesh(mess1v, mess1n, mess1u, standartFragmentShadergbr, flippedVertexShader, eng, tank, tank, null, tankx, tanky, false, cubem);
    ww[38].pos.z = -285;
    ww[38].pos.x = 50;
    ww[38].pos.y = 100;
    ww[38].rot.y = -1.5708;

    ww[39] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, british, null, paptex, 512, 512, true, cubem);
    ww[39].pos.z = -260;
    ww[39].pos.y = 1.5;
    ww[39].pos.x = 16.8;
    ww[39].rot.x = -1.5;
    ww[39].rot.y = 1.5708;
    ww[39].shadowcullmode = eng.gl.BACK;

    ww[40] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, blitz, null, paptex, blitzx, blitzy, true, cubem);
    ww[40].pos.z = -265;
    ww[40].pos.y = 1.5;
    ww[40].pos.x = 16.8;
    ww[40].rot.x = -1.5;
    ww[40].rot.y = 1.5708;
    ww[40].shadowcullmode = eng.gl.BACK;

    ww[41] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[41].pos.z = -279;
    ww[41].pos.x = 12.5;

    ww[42] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, inc, null, paptex, 512, 512, false, cubem);
    ww[42].pos.z = -9;
    ww[42].pos.y = 1.5708;
    ww[42].pos.x = 0;
    ww[42].rot.x = -1.5708;

    ww[43] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, cap1, null, paptex, 512, 512, false, cubem);
    ww[43].pos.z = -26;
    ww[43].pos.y = 1.5708;
    ww[43].pos.x = 0;
    ww[43].rot.x = -1.5708;

    ww[44] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, cap2, null, paptex, 512, 512, false, cubem);
    ww[44].pos.z = -109;
    ww[44].pos.y = 1.5708;
    ww[44].pos.x = 12.5;
    ww[44].rot.x = -1.5708;

    ww[45] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, cap3, null, paptex, 512, 512, false, cubem);
    ww[45].pos.z = -287;
    ww[45].pos.y = 1.5708;
    ww[45].pos.x = 12.5;
    ww[45].rot.x = -1.5708;

    ww[46] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[46].pos.z = -299;
    ww[46].pos.x = 12.5;

    ww[47] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[47].pos.z = -319;
    ww[47].pos.x = 12.5;

    ww[48] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[48].pos.z = -339;
    ww[48].pos.x = 12.5;

    ww[49] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[49].pos.z = -359;
    ww[49].pos.x = 12.5;

    ww[50] = new Mesh(flaggv, flaggn, flaggu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[50].pos.z = -299;
    ww[50].pos.x = 8.6;
    ww[50].pos.y = 1;

    ww[51] = new Mesh(flaguv, flagun, flaguu, standartFragmentShadergbr, flippedVertexShader, eng, flags, null, null, flagsx, flagsy, true, cubem);
    ww[51].pos.z = -299;
    ww[51].pos.x = 16.8;
    ww[51].pos.y = 1;

    ww[52] = new Mesh(kremv, kremn, kremu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([140, 129, 152, 255]), parks, null, 1, 1, false, cubem);
    ww[52].pos.z = -340;
    ww[52].pos.x = 32.5;
    ww[52].rot.y = 1.5708;
    ww[52].pos.y = 4;

    ww[53] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b1, null, paptex, 512, 512, true, cubem);
    ww[53].pos.z = -335;
    ww[53].pos.y = 1.5708;
    ww[53].pos.x = 16.8;
    ww[53].rot.x = -1.5708;
    ww[53].rot.y = 1.5708;
    ww[53].shadowcullmode = eng.gl.BACK;
    
    ww[54] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b6, null, paptex, b6x, b6y, true, cubem);
    ww[54].pos.z = -340;
    ww[54].pos.y = 1.5708;
    ww[54].pos.x = 16.8;
    ww[54].rot.x = -1.5708;
    ww[54].rot.y = 1.5708;
    ww[54].shadowcullmode = eng.gl.BACK;

    ww[55] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b2, null, paptex, 512, 512, true, cubem);
    ww[55].pos.z = -345;
    ww[55].pos.y = 1.5708;
    ww[55].pos.x = 16.8;
    ww[55].rot.x = -1.5708;
    ww[55].rot.y = 1.5708;
    ww[55].shadowcullmode = eng.gl.BACK;

    ww[56] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b3, null, paptex, 512, 512, true, cubem);
    ww[56].pos.z = -350;
    ww[56].pos.y = 1.5708;
    ww[56].pos.x = 16.8;
    ww[56].rot.x = -1.5708;
    ww[56].rot.y = 1.5708;
    ww[56].shadowcullmode = eng.gl.BACK;

    ww[57] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b7, null, paptex, b7x, b7y, true, cubem);
    ww[57].pos.z = -355;
    ww[57].pos.y = 1.5708;
    ww[57].pos.x = 16.8;
    ww[57].rot.x = -1.5708;
    ww[57].rot.y = 1.5708;
    ww[57].shadowcullmode = eng.gl.BACK;

    ww[58] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b4, null, paptex, 512, 512, true, cubem);
    ww[58].pos.z = -360;
    ww[58].pos.y = 1.5708;
    ww[58].pos.x = 16.8;
    ww[58].rot.x = -1.5708;
    ww[58].rot.y = 1.5708;
    ww[58].shadowcullmode = eng.gl.BACK;

    ww[59] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b9, null, paptex, b9x, b9y, true, cubem);
    ww[59].pos.z = -365;
    ww[59].pos.y = 1.5708;
    ww[59].pos.x = 16.8;
    ww[59].rot.x = -1.5708;
    ww[59].rot.y = 1.5708;
    ww[59].shadowcullmode = eng.gl.BACK;

    ww[60] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, b5, null, paptex, 512, 512, true, cubem);
    ww[60].pos.z = -370;
    ww[60].pos.y = 1.5708;
    ww[60].pos.x = 16.8;
    ww[60].rot.x = -1.5708;
    ww[60].rot.y = 1.5708;
    ww[60].shadowcullmode = eng.gl.BACK;

    ww[61] = new Mesh(planev, planen, planeu, standartFragmentShadergbr, flippedVertexShader, eng, b8, null, paptex, b8x, b8y, true, cubem);
    ww[61].pos.z = -375;
    ww[61].pos.y = 1.5708;
    ww[61].pos.x = 16.8;
    ww[61].rot.x = -1.5708;
    ww[61].rot.y = 1.5708;
    ww[61].shadowcullmode = eng.gl.BACK;

    ww[62] = new Mesh(kstv, kstn, kstu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([0, 255, 0, 255]), parks, null, 1, 1, false, cubem);
    ww[62].pos.z = -340;
    ww[62].pos.x = 32.5;
    ww[62].pos.y = 4;

    ww[63] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[63].pos.z = -379;
    ww[63].pos.x = 12.5;

    ww[64] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[64].pos.z = -399;
    ww[64].pos.x = 12.5;

    ww[65] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[65].pos.z = -419;
    ww[65].pos.x = 12.5;

    ww[66] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, conf, null, paptex, confx, confy, true, cubem);
    ww[66].pos.z = -380;
    ww[66].pos.y = 1.5708;
    ww[66].pos.x = 16.8;
    ww[66].rot.x = -1.5708;
    ww[66].rot.y = 1.5708;
    ww[66].shadowcullmode = eng.gl.BACK;

    ww[67] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, teheran, paptex, paptex, teheranx, teherany, true, cubem);
    ww[67].pos.z = -385;
    ww[67].pos.y = 1.5708;
    ww[67].pos.x = 16.8;
    ww[67].rot.x = -1.5708;
    ww[67].rot.y = 1.5708;
    ww[67].shadowcullmode = eng.gl.BACK;

    ww[68] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, yalta, null, paptex, yaltax, yaltay, true, cubem);
    ww[68].pos.z = -390;
    ww[68].pos.y = 1.5708;
    ww[68].pos.x = 16.8;
    ww[68].rot.x = -1.5708;
    ww[68].rot.y = 1.5708;
    ww[68].shadowcullmode = eng.gl.BACK;

    ww[69] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, postdam, null, paptex, postdamx, postdamy, true, cubem);
    ww[69].pos.z = -395;
    ww[69].pos.y = 1.5708;
    ww[69].pos.x = 16.8;
    ww[69].rot.x = -1.5708;
    ww[69].rot.y = 1.5708;
    ww[69].shadowcullmode = eng.gl.BACK;

    ww[70] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[70].pos.z = -439;
    ww[70].pos.x = 12.5;

    ww[71] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[71].pos.z = -459;
    ww[71].pos.x = 12.5;

    ww[72] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[72].pos.z = -479;
    ww[72].pos.x = 12.5;

    ww[73] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[73].pos.z = -499;
    ww[73].pos.x = 12.5;

    ww[74] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[74].pos.z = -519;
    ww[74].pos.x = 12.5;

    ww[75] = new Mesh(gatev, gaten, gateu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([140, 129, 152, 255]), parks, null, 1, 1, false, cubem);
    ww[75].pos.z = -459;
    ww[75].pos.x = 12.5;
    ww[75].scale.x = 20;
    ww[75].scale.y = 20;
    ww[75].scale.z = 20;

    ww[76] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, cap4, null, paptex, cap4x, cap4y, false, cubem);
    ww[76].pos.z = -439;
    ww[76].pos.y = 1.5708;
    ww[76].pos.x = 12.5;
    ww[76].rot.x = -1.5708;

    ww[77] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, gcap, null, paptex, gcapx, gcapy, false, cubem);
    ww[77].pos.z = -459;
    ww[77].pos.y = 1.5708;
    ww[77].pos.x = 12.5;
    ww[77].rot.x = -1.5708;

    ww[78] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, after, null, paptex, afterx, aftery, false, cubem);
    ww[78].pos.z = -464;
    ww[78].pos.y = 1.5708;
    ww[78].pos.x = 12.5;
    ww[78].rot.x = -1.5708;

    ww[79] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, up, null, null, upx, upy, false, cubem);
    ww[79].pos.z = -469;
    ww[79].pos.y = 1.5708;
    ww[79].pos.x = 12.5;
    ww[79].rot.x = -1.5708;

    ww[80] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j1, null, paptex, j1x, j1y, false, cubem);
    ww[80].pos.z = -479;
    ww[80].pos.y = 1.5708;
    ww[80].pos.x = 12.5;
    ww[80].rot.x = -1.5708;

    ww[81] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j2, null, paptex, j2x, j2y, false, cubem);
    ww[81].pos.z = -484;
    ww[81].pos.y = 1.5708;
    ww[81].pos.x = 12.5;
    ww[81].rot.x = -1.5708;

    ww[82] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[82].pos.z = -539;
    ww[82].pos.x = 12.5;

    ww[83] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[83].pos.z = -559;
    ww[83].pos.x = 12.5;

    ww[84] = new Mesh(parkv, parkn, parku, standartFragmentShadergbr, flippedVertexShader, eng, parkt, parks, null, 512, 512, true, cubem);
    ww[84].pos.z = -579;
    ww[84].pos.x = 12.5;

    ww[85] = new Mesh(cloudv, cloudn, cloudu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([0, 255, 0, 255]), new Uint8Array([255, 255, 255, 255]), null, 1, 1, false, cubem);
    ww[85].pos.z = -530;
    ww[85].pos.x = 22.5;
    ww[85].pos.y = -22.5;
    ww[85].scale.z = 0;
    ww[85].scale.x = 0;
    ww[85].scale.y = 0;

    ww[86] = new Mesh(bombv, bombn, bombu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([0, 255, 0, 255]), parks, null, 1, 1, false, cubem);
    ww[86].pos.z = -530;
    ww[86].pos.x = 22.5;
    ww[86].pos.y = 32.5;

    ww[87] = new Mesh(cloudv, cloudn, cloudu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([0, 255, 0, 255]), new Uint8Array([255, 255, 255, 255]), null, 1, 1, false, cubem);
    ww[87].pos.z = -540;
    ww[87].pos.x = 2.5;
    ww[87].pos.y = -22.5;
    ww[87].scale.z = 0;
    ww[87].scale.x = 0;
    ww[87].scale.y = 0;

    ww[88] = new Mesh(bombv, bombn, bombu, standartFragmentShadergbr, flippedVertexShader, eng, new Uint8Array([0, 255, 0, 255]), parks, null, 1, 1, false, cubem);
    ww[88].pos.z = -540;
    ww[88].pos.x = 2.5;
    ww[88].pos.y = 32.5;

    ww[89] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j3, null, paptex, j3x, j3y, false, cubem);
    ww[89].pos.z = -550;
    ww[89].pos.y = 1.5708;
    ww[89].pos.x = 12.5;
    ww[89].rot.x = -1.5708;

    ww[90] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j4, null, paptex, j4x, j4y, false, cubem);
    ww[90].pos.z = -555;
    ww[90].pos.y = 1.5708;
    ww[90].pos.x = 12.5;
    ww[90].rot.x = -1.5708;

    ww[91] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j5, null, paptex, j5x, j5y, false, cubem);
    ww[91].pos.z = -570;
    ww[91].pos.y = 1.5708;
    ww[91].pos.x = 12.5;
    ww[91].rot.x = -1.5708;

    ww[92] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j6, null, paptex, j6x, j6y, false, cubem);
    ww[92].pos.z = -575;
    ww[92].pos.y = 1.5708;
    ww[92].pos.x = 12.5;
    ww[92].rot.x = -1.5708;

    ww[93] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, j7, null, paptex, j7x, j7y, false, cubem);
    ww[93].pos.z = -580;
    ww[93].pos.y = 1.5708;
    ww[93].pos.x = 12.5;
    ww[93].rot.x = -1.5708;

    ww[94] = new Mesh(planev, planen, planeu, pstandartFragmentShadergbr, flippedVertexShader, eng, tut, null, paptex, tutx, tuty, false, cubem);
    ww[94].pos.z = -1;
    ww[94].pos.y = 1.5708;
    ww[94].rot.x = -1.5708;

    const wwr = 95;

    var vasilei = new Mesh(viv, vin, viu, pstandartFragmentShadergbr, flippedVertexShader, eng, vtex, null, null, vtexx, vtexy, true, cubem);
    vasilei.scale = new vec3(0.7, 0.7, 0.7);

    var vasilew = new Mesh(vwv, vwn, vwu, pstandartFragmentShadergbr, flippedVertexShader, eng, vtex, null, null, vtexx, vtexy, true, cubem);

    var sp = new Mesh(spv, spn, spu, standartFragmentShadergbr, flippedVertexShader, eng, gh1, null, null, gh1x, gh1y, false, cubem);

    //2.1200754923362317 -1.810000000000015 7.5226029737821944 
    //2.017223956227649 -1.810000000000015 24.79113506340336 
    //4.318600992229594 -1.7000000000000148 67.30141171884702 
    //-13.11687426357555 -1.7000000000000148 104.53421658738725 
    //-9.249339762686741 -1.7000000000000148 208.1700252477184 
    //-16.52274738933865 -1.7000000000000148 262.7614394257354 
    //-10.311957639372167 -1.7000000000000148 286.47456444854316 
    //-15.954423649209534 -1.7000000000000148 397.9188203609196 
    //-8.899905060959716 -1.7000000000000148 438.6166522164879 
    //-10.077970307349673 -1.7000000000000148 484.36064629169175 
    //-9.84853100293917 -1.7000000000000148 579.7943355807352

    function drawFrame(now){
        if(eng.pos.z < 7){
            vasilei.pos = new vec3(-0.5, 0, -7.522);
            sp.pos = new vec3(1, 3.7, -7.522);
            sp.rot.y = 1.5708;
            sp.rot.z = 1.5708;
        }else if(eng.pos.z > 7 && eng.pos.z < 24){
            vasilei.pos = new vec3(-2.12, 0, -24.79);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 24 && eng.pos.z < 67){
            vasilei.pos = new vec3(-4.31, 0, -67.3);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 67 && eng.pos.z < 104){
            vasilei.pos = new vec3(13.11, 0, -104.53);
            vasilei.rot.y = 1.5708;
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 104 && eng.pos.z < 208){
            vasilei.rot.y = 0;
            vasilei.pos = new vec3(9.24, 0, -208.17);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 208 && eng.pos.z < 262){
            vasilei.rot.y = 1.5708;
            vasilei.pos = new vec3(16.52, 0, -262.76);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 262 && eng.pos.z < 286){
            vasilei.rot.y = 0;
            vasilei.pos = new vec3(10.31, 0, -286.47);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 286 && eng.pos.z < 397){
            vasilei.pos = new vec3(15.95, 0, -397.47);
            vasilei.rot.y = 1.5708;
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 307 && eng.pos.z < 438){
            vasilei.pos = new vec3(8.89, 0, -438.47);
            vasilei.rot.y = 0;
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 438 && eng.pos.z < 484){
            vasilei.pos = new vec3(10.07, 0, -484.36);
            sp.pos = new vec3(1, 1.7, -700.522);
        }else if(eng.pos.z > 484 && eng.pos.z < 579){
            vasilei.pos = new vec3(9.84, 0, -579.79);
            sp.pos = new vec3(1, 1.7, -700.522);
        }
        eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
        eng.useorthosh = true;
        eng.sfar = 200.0;
        eng.sfov = 40.0;
        eng.shadowpos.z = -20.0;
        eng.shadowpos.y = -40.7;
        eng.shadowrot.y = 0.7;
        eng.shadowrot.x = -0.7;
        eng.beginShadowPass();

        eng.shadowpos.z = eng.pos.z;

        if(eng.pos.z >= 110 && eng.pos.z <= 140 && ww[17].pos.x < 22){
            ww[17].pos.x += 0.2;
            ww[18].pos.x += 0.2;
            ww[19].pos.x += 0.2;
            ww[17].pos.y = 1.5;
            ww[18].pos.y = 1.5;
            ww[19].pos.y = 1.5;
        }else if(eng.pos.z >= 290 && eng.pos.z <= 320 && ww[17].pos.x < 22){
            ww[17].pos.x += 0.2;
            ww[18].pos.x += 0.2;
            ww[19].pos.x += 0.2;
            ww[17].pos.y = 1.5;
            ww[18].pos.y = 1.5;
            ww[19].pos.y = 1.5;
            ww[17].pos.z = -310;
            ww[18].pos.z = -320;
            ww[19].pos.z = -330;
        }else if(eng.pos.z >= 140 && eng.pos.z <= 290){
            ww[17].pos.x = 0;
            ww[18].pos.x = -3;
            ww[19].pos.x = -6;
            ww[17].pos.y = 200;
            ww[18].pos.y = 200;
            ww[19].pos.y = 200;
        }else{
            ww[17].pos.y = 200;
            ww[18].pos.y = 200;
            ww[19].pos.y = 200;
        }

        if(eng.pos.z >= 229 && eng.pos.z <= 260){
            ww[36].pos.x -= 0.5;
            ww[37].pos.x -= 0.5;
            ww[38].pos.x -= 0.5;
            ww[36].pos.y = 25;
            ww[37].pos.y = 25;
            ww[38].pos.y = 25;
        }else{
            ww[36].pos.x = 40;
            ww[37].pos.x = 45;
            ww[38].pos.x = 50;
            ww[36].pos.y = 200;
            ww[37].pos.y = 200;
            ww[38].pos.y = 200;
        }

        if(eng.pos.z > 540 && ww[87].scale.x < 1.0){
            ww[88].pos.y -= 0.5;
            if(ww[88].pos.y < -22 && ww[87].scale.x < 0.5){
                ww[87].scale.z += 0.1;
                ww[87].scale.x += 0.1;
                ww[87].scale.y += 0.1;
            }
        }

        if(eng.pos.z > 530 && ww[85].scale.x < 1.0){
            ww[86].pos.y -= 0.5;
            if(ww[86].pos.y < -22 && ww[85].scale.x < 0.5){
                ww[85].scale.z += 0.1;
                ww[85].scale.x += 0.1;
                ww[85].scale.y += 0.1;
            }
        }

        for(var i = 0; i!=wwr; i+=1){
            if(i != 52){
                if(dist(new vec3(-eng.pos.x, -eng.pos.y, -eng.pos.z), ww[i].pos) < 40){
                    ww[i].Draw(eng);
                }
            }
        }

        if((eng.pos.z >= 49 && eng.pos.z <= 69)||eng.pos.z >= 110){
            skybox.additionalval = 2.0;
            eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 0.5, 0.5), 1);
        }else{
            skybox.additionalval = 0.0;
            eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
        }

        vasilei.Draw(eng);
        sp.Draw(eng);

        eng.beginFrame();

        touchhandle();

        skybox.Draw(eng);

        for(var i = 0; i!=wwr; i+=1){
            if(dist(new vec3(-eng.pos.x, -eng.pos.y, -eng.pos.z), ww[i].pos) < 40){
                ww[i].Draw(eng);
            }
        }

        vasilei.Draw(eng);
        sp.Draw(eng);

        eng.setLight(0, new vec3(2.4813325914117295, 3, -105.29181850063065), new vec3(1, 1, 1), 0);
        eng.useorthosh = false;
        eng.sfar = 100.0;
        eng.sfov = 120;
        eng.shadowpos.z = 103.4047025989495;
        eng.shadowpos.y = -1.7000000000000148;
        eng.shadowpos.x = 2.760925318514738;
        eng.shadowrot.y = -0.002499999999998994;
        eng.shadowrot.x = 0.11999999999999998;
        eng.beginShadowPass();

        for(var i = 0; i!=9; i+=1){
            if(i != 4 && i != 9){
                interbelic[i].Draw(eng);
            }
        }


        eng.beginFrame();

        for(var i = 0; i!=9; i+=1){
            if(i != 5 && i != 10){
                interbelic[i].Draw(eng);
            }
        }

        eng.shadowpos.z = 106.29181850063065;
        eng.shadowpos.y = -1.7000000000000148;
        eng.shadowpos.x = -5.4813325914117295;
        eng.shadowrot.y = -0.013333333333333378;
        eng.shadowrot.x = 0.006250000000000492;
        eng.beginShadowPass();

        for(var i = 9; i!=14; i+=1){
            if(i != 4 && i != 9){
                interbelic[i].Draw(eng);
            }
        }

        eng.beginFrame();

        for(var i = 9; i!=21; i+=1){
            if(i != 5 && i != 10){
                interbelic[i].Draw(eng);
            }
        }

        eng.endFrame(drawFrame, now);

        if(eng.pos.y >= 1){
            eng.pos.y = -3;
        }
    }
    drawFrame();
}

window.onload = main;
