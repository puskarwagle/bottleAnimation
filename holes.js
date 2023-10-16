// Define variables
let scene, camera, renderer, base;

// Initialize Three.js scene
scene = new THREE.Scene();

// Create a camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 7, 1);
camera.lookAt(0, 1, 0);

// Create the base
const geometry = new THREE.BoxGeometry(4, 4, 0.04); // Adjust the dimensions as needed
const material = new THREE.MeshBasicMaterial({ color: 0x3498db }); // Blue color
base = new THREE.Mesh(geometry, material);
scene.add(base);

// Define the dimensions of the walls
const wallWidth = 4; // Adjust the width of the walls
const wallHeight = 2; // Adjust the height of the walls
const wallThickness = 0.1; // Adjust the thickness of the walls
const wallMat = new THREE.MeshBasicMaterial({ color: 0x348db });

// Create the walls
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, wallWidth),
  wallMat
);
leftWall.position.set(-wallWidth / 2 - wallThickness / 2, wallHeight / 50, -1);

const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, wallWidth),
  wallMat
);
rightWall.position.set(wallWidth / 2 + wallThickness / 2, wallHeight / 48, -1);


const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness),
  wallMat
);
backWall.position.set(0, wallHeight / 1, -wallWidth / 4 - wallThickness / -2);

/* const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness),
  wallMat
);
frontWall.position.set(0, wallHeight / 2, wallWidth / 2 + wallThickness / 2);
 */
leftWall.rotation.x = Math.PI / 2;
rightWall.rotation.x = Math.PI / 2;
backWall.rotation.x = Math.PI / 2;
//frontWall.rotation.x = Math.PI / 2;
base.add(leftWall, rightWall, backWall);

const holes = [];
const funnels = [];
const bottles = [];

// Create holes, funnels, and bottles in a grid
for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
        // Create holes
        const holeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32) 
        const holeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff }); // Red color
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(i * 1.5, j * 1.5, 0); // Adjust spacing
        base.add(hole);
        holes.push(hole);

        // Create funnels
        const funnelGeometry = new THREE.CylinderGeometry(0.1, 0.05, 0.2, 32); // Adjust dimensions
        const funnelMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
        const funnel = new THREE.Mesh(funnelGeometry, funnelMaterial);
        funnel.position.set(i * 0.0, j * 0.0, 0.3); // Position the funnel at the same location as the hole
        funnel.rotation.x = Math.PI / 2; // Rotate the funnel to stand upright
        hole.add(funnel);
        funnels.push(funnel);

        // Create bottles
        const bottleGeometry = new THREE.CylinderGeometry(0.2, 0.05, 2, 16); // Adjust dimensions
        const bottleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.set(i * 0.0, j * 0.0, 1.4); // Position the bottle at the same location as the funnel
        bottle.rotation.x = Math.PI / 2; 
        hole.add(bottle);
        bottles.push(bottle);
    }
}

// Create a renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the base
    base.rotation.x += 0.01;
    base.rotation.y += 0.01;

    // Rotate the bottles
    /* bottles.forEach((bottle) => {
        bottle.rotation.x += 0.01;
        bottle.rotation.y += 0.01;
    }); */

    renderer.render(scene, camera);
};
renderer.render(scene, camera);
// Start the animation loop
animate();
