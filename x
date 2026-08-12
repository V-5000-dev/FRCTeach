// Copyright (c) FIRST and other WPILib contributors.
// Open Source Software; you can modify and/or share it under the terms of
// the WPILib BSD license file in the root directory of this project.

package frc.robot.commands.DriveCMDS;

import static frc.robot.Constants.Constants.OperatorConstants.*;

import edu.wpi.first.math.MathUtil;
import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.button.CommandXboxController;
import frc.robot.subsystems.CANDriveSubsystem;
import frc.robot.subsystems.ControllerSubsystem;
import frc.robot.subsystems.DriveControllerSubsystem;

/**
 * This is the default drive command - it reads the driver's joysticks and drives the robot.
 * The left stick controls the left side and the right stick controls the right side (tank drive).
 */
public class Drive extends Command {
    
  private final CANDriveSubsystem driveSubsystem;
  // Handles smoothing so speed changes aren't jerky
  private final DriveControllerSubsystem driveControllerSubsystem;

  private final ControllerSubsystem controllerSubsystem;

  // Keep track of the smoothed speeds between loops
  private double leftSmoothed = 0.0;
  private double rightSmoothed = 0.0;

  // Create a Drive command
  public Drive(CANDriveSubsystem driveSystem, DriveControllerSubsystem driveControllerSubsystem, CommandXboxController driverController, ControllerSubsystem controllerSubsystem) {
    this.driveSubsystem = driveSystem;
    this.driveControllerSubsystem = driveControllerSubsystem;
    this.controllerSubsystem = controllerSubsystem;

    addRequirements(driveSystem);
  }

  @Override
  public void initialize() {
    leftSmoothed = MathUtil.applyDeadband(controllerSubsystem.getAxisOrZero(DRIVER_LEFT_Y_AXIS, true), DRIVE_DEADBAND)
        * (DRIVER_LEFT_Y_INVERTED ? -DRIVE_SCALING : DRIVE_SCALING);
    rightSmoothed = MathUtil.applyDeadband(controllerSubsystem.getAxisOrZero(DRIVER_RIGHT_Y_AXIS, false), DRIVE_DEADBAND)
        * (DRIVER_RIGHT_Y_INVERTED ? -DRIVE_SCALING : DRIVE_SCALING);
  }

  @Override
  public void execute() {
    // Read raw stick values
    double left = controllerSubsystem.getAxisOrZero(DRIVER_LEFT_Y_AXIS, true);
    double right = controllerSubsystem.getAxisOrZero(DRIVER_RIGHT_Y_AXIS, false);

    leftSmoothed = driveControllerSubsystem.applyAsymmetricSlew(leftSmoothed, left);
    rightSmoothed = driveControllerSubsystem.applyAsymmetricSlew(rightSmoothed, right);

    driveSubsystem.driveTank(leftSmoothed, rightSmoothed);
  }

  @Override
  public void end(boolean interrupted) {
    leftSmoothed = 0.0;
    rightSmoothed = 0.0;
    driveSubsystem.stop();
  }

  @Override
  public boolean isFinished() {
    return false;
  }
  
}
