package frc.robot.commands.DriveCMDS;
import edu.wpi.first.math.MathUtil;
import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.button.CommandXboxController;
import frc.robot.subsystems.CANDriveSubsystem;
import frc.robot.subsystems.ControllerSubsystem;
import frc.robot.subsystems.DriveControllerSubsystem;
//Necessary Import Commands
import static frc.robot.Constants.Constants.OperatorConstants.*;

public class Drive extends Command{
  public Drive(CANDriveSubsystem driveSystem, DriveControllerSubsystem driveControllerSubsystem, CommandXboxController driverController, ControllerSubsystem controllerSubsystem) {
    this.driveSubsystem = driveSystem;
    this.driveControllerSubsystem = driveControllerSubsystem;
    this.controllerSubsystem = controllerSubsystem;

    addRequirements(driveSystem);
  }
  @Override
  public void execute() {
    // Read raw stick values and flip if needed
    double left = controllerSubsystem.getAxisOrZero(DRIVER_LEFT_Y_AXIS, true);
    double right = controllerSubsystem.getAxisOrZero(DRIVER_RIGHT_Y_AXIS, false);
    if (DRIVER_LEFT_Y_INVERTED) left = -left;
    if (DRIVER_RIGHT_Y_INVERTED) right = -right;

    // Ignore tiny stick movements and scale to our speed limit
    left = MathUtil.applyDeadband(left, DRIVE_DEADBAND) * DRIVE_SCALING;
    right = MathUtil.applyDeadband(right, DRIVE_DEADBAND) * DRIVE_SCALING;

    // Smooth out speed changes so the robot doesn't lurch
    leftSmoothed = driveControllerSubsystem.applyAsymmetricSlew(leftSmoothed, left);
    rightSmoothed = driveControllerSubsystem.applyAsymmetricSlew(rightSmoothed, right);

    driveSubsystem.driveTank(leftSmoothed, rightSmoothed);
  }
}
public final class Constants()
{
  public static final class OperatorConstants{
    public static final boolean DRIVER_LEFT_Y_INVERTED = false;
    public static final boolean DRIVER_RIGHT_Y_INVERTED = false;
    public static final double DRIVE_DEADBAND = 0.08;
    public static double DRIVE_SCALING = 0.7;
  }
}