# 1st weekly update on the IK system research

## Summary:

Wow, it's been a week since I started this little project. Time sure flies by and I made some major progress so far. 
To sum it up here is the my short list of achievements aquired during this week:

### My Conclusions:

1. There is no consensus at all on IK and its uses.
2. Unity IK system is too much related with its huge avatar system, which has a steep learning curve.
3. Most Ik systems have a sort of iterative algorithm (CCD) to reach to "more or less" the desired rotation of each bone in a chain, 
which for a 2 bone chain is overkill and a waste of processing.
4. Rigging an IK leg with 2 bones is simpler than learning an IK system. 
  1. It involves 2 steps: make the thigh look at a target and make the Thigh and Leg flex along the X axis to snap the foot to the target position.
5. An IK walk cycle can be approximated to a pair of targets following a elipsoid path, each on oposite sides of the elipsoid.
6. IK animation creates primary movement quickly, but creating secondary movement is something else entirely.
7. Secondary up & down movement of a walk cycle occurs in a frequecy that is the double of the primary walk cycle frequency. 
(secondary movement freq = 2* walk cycle freq)

### What I did:

1. Created a base object to work on inside the Unity Environment. The object consists of 11 blocks: a pelvis, 2 thighs, 2 legs, 2 feet, 2 toes
2. Created a rig simulacra of an actual rig created from other modeling and rigging software.
3. Worked on turing one entire leg (Which consists of the Thigh, Leg, Foot and toes bones) into an IK Rig. First making it look to a target point 
with a lookup pole. Then worked on the function that makes the foot snap into the target position, 
if the target position requires that the thigh and leg be flexed.
4. Created theses for IK animation: 1st Thesis: IK animation revolves around describing curves for the IK targets and poles to folow and 
make the rest of the rig move. 2nd Thesis: A walk cycle can be described as a circle. Problem: height of step and length of step aren't 
always the same. 2nd Thesis v2: A walk cycle can be described as an Elipse with 4 parameters: Elipse center position, Elipse Height, Elipse width, 
revolution speed.
5. put thesis 1 and 2 into practice. Resuts are acceptable, but not industry standard.

### My plan for the future of this project:

* Replace the elipsoid path of the walk cycle with a Bezier path.
  * Draw the bezier path on the editor.
  * Use empty game objects as the Bezier points and anchors.
  * Create a way to describe the animation speed along the path. (Not sure if I'll be able to make it)
  * Allow for each bezier to be associated with an Ik target per animation. (Really not sure how if i'll be able to make it).
* Create the rest of the rig (Upper Torso, Shoulders, arm, forearm, hand, neck and head).
  * Ik the rest of the rig (create 3 more IK chains: one for each arm and another for the spine (and head... maybe?)).
  * Describe the curves for the new targets and poles.
* Create a rotational restrictor script/System.
* Create a reusable animation system. (The unreachable Ideal...)
* Put a humanoid Character on the system
  * Ik the whole character.
  * Apply an IK animation on the character (This would be a cool Proof of Concept!).
* Create a basic Library of animations. (This could become a business)
* Create a basic Library of constraints. (And this, the icing on the cake).
* Create the presentation for the Direct Studies class...

## Now, the details:

### There is not a lot of intro knowledge for IK.

Let's get this straight: this project does not allow for me to spend more than 2 days resarching and learning before starting. 
So What poped up along my research are IK terms such as IK chains, Target, Pole, effector(the bone you want to align with the chain); 
and IK algorithms such as CCD (Cyclic Coordinate Descent) which is an iterative algorithm for an IK bonechain with any number of bones and 
another one called FABRIK.

IK stands in direct opposition to FK (Forward Kinematics). It has been largely used specially in the game industry and R&D Robotics for a
final polish in character animation and controlling robotic arms with multiple joints. Learning about Inverse Kinematics taught me a lot of 
theory, but in order to truly understand IK, It would be better try my hand at making an IK application in unity. Now I've hit another unexpected
barrire: Unity's 5 IK System is intertwined with its Avatar system, which only applies for humanoid rigged characters, which means that it 
would be too much of learning and breaking before getting anything simple out.

So I created a mock model to work IK Theory with.
