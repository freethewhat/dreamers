var THREE = require('three');

class Gradient {
  constructor() {
    this.clock = new THREE.Clock();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      this.width / - 2,
      this.width / 2,
      this.height / 2,
      this.height / - 2,
      1,
      1000
    );
    this.camera.position.z = 1.0;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    this.gradientUniforms = {
      color1: {value: [0.43, 0.74, 0.99, 1.0]},
      color2: {value: [1.0, 0.15, 0.99, 1.0]},
      time: {value: this.clock.getElapsedTime()}
    }

    document.body.appendChild(this.renderer.domElement);

    this.renderer.domElement.classList.add('background');

    var planeGeometry = new THREE.PlaneBufferGeometry(2, 2);

    var shader = new THREE.ShaderMaterial({
      uniforms: this.gradientUniforms,
      vertexShader: `varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4( position, 1.0 );
      }`,
      fragmentShader: `uniform vec4 color1;
      uniform vec4 color2;
      uniform float time;

      varying vec2 vUv;

      vec4 generateGradient(vec4 c1, vec4 c2, vec2 uv){
        vec4 c = mix(c1, c2, uv.x + uv.y - 2.0 * uv.x * uv.y);
        return c;
      }
    /**********************************/
      void main(){
        vec2 uv = vUv;
        vec4 color;

        float noise;

        uv = vec2(uv.x * (cos(time)+1.0)/2.0,uv.y * (sin(time)+1.0)/2.0);
        color = generateGradient(color1,color2,uv);

        gl_FragColor = color;
      }`
    })

    var plane = new THREE.Mesh(planeGeometry, shader);
    this.scene.add(plane);
  }

  animate() {
    var self = this;

    requestAnimationFrame(self.animate.bind(self));
    this.gradientUniforms.time.value=this.clock.getElapsedTime();

    this.renderer.render(this.scene, this.camera);
  };
}

module.exports={
  Gradient
}