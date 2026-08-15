import static frc.robot.Constants.Constants.OperatorConstants.*;
public class Rotate extends Command
{
  public void execute() {
    double left;
    double right;
  
    if (clockwise) {
      left = -ROTATE_SPEED; 
      right = ROTATE_SPEED;  
    } else {
      left = ROTATE_SPEED;   
      right = -ROTATE_SPEED; 
    }
  }
}

import frc.robot.Constants.Constants.OperatorConstants;
public class Rotate extends Command
{
  public void execute() {
    double left;
    double right;
  
    if (clockwise) {
      left = -OperatorConstants.ROTATE_SPEED;
      right = OperatorConstants.ROTATE_SPEED;
    } else {
      left = OperatorConstants.ROTATE_SPEED;
      right = -OperatorConstants.ROTATE_SPEED;
    }
  }
}
