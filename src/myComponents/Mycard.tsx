import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface MycardPorps {
  header: string;
  title: string;
  content: string;
  footer?: string;
  action?: string;
  button: string;
}

export const MyCard = ({
  header,
  title,
  content,
  footer,
  action,
  button,
}: MycardPorps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form
          action="
        "
        >
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input id="email" placeholder="enter your email" type="email" />
              <label
                htmlFor="
              password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="enter your password"
              />

              <Button
                variant={"destructive"}
                className="cursor-pointer hover:bg-red-600/75 py-2 gap-y-3"
                size={"lg"}
              >
                {button}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
