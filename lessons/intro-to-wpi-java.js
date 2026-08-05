import { TextBlock, CodeEditor, Quiz, render } from "../js/components.js";

render("lesson-content", [
  TextBlock({
    heading: "What is WPILib?",
    body: "WPILib is the official Java library for FIRST Robotics Competition teams. It provides ready-made classes for controlling motors, reading sensors, and structuring your robot code so you can focus on strategy instead of low-level hardware."
  }),

  TextBlock({
    heading: "Basic Robot Structure",
    body: "Every WPILib robot program extends TimedRobot. The methods below are called automatically by the framework — you just fill in what should happen at each stage of the match."
  }),

  CodeEditor({
    id: "intro",
    starterCode: `import edu.wpi.first.wpilibj.TimedRobot;

public class Robot extends TimedRobot {

  @Override
  public void autonomousInit() {
    // Runs once when autonomous period starts
  }

  @Override
  public void autonomousPeriodic() {
    // Runs every 20ms during autonomous
  }

  @Override
  public void teleopPeriodic() {
    // Runs every 20ms during driver control
  }
}`
  }),

  Quiz({
    question: "Which method runs repeatedly during the autonomous period?",
    options: [
      "autonomousInit()",
      "autonomousPeriodic()",
      "teleopPeriodic()",
      "robotInit()"
    ],
    correctIndex: 1
  })
]);
