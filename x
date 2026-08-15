public final class Accessibles {
  public static class Outtake {
    public static boolean prefireOn = false;
  }
}
import frc.robot.Accessibles;
public class PrefireCommand extends Command{
  public void initialize()
  {
    Accessibles.Outtake.prefireOn = true;
  }
}
