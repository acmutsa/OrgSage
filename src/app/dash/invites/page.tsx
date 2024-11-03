import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

const temp = [
    "blah1",
    "blah2",
    "blah3",
    "blah4",
    "blah5",
    "blah6",
]

export default function Page() {
    return (
        <div className="align-center flex w-full flex-grow justify-center p-20 text-white">
            <Carousel className="flex h-1/2 w-[20em] items-center">
                <CarouselContent>
                    {temp.map((text) => { return (
                        <CarouselItem key={text} >
                            <Card className="flex h-full flex-col">
                                <CardHeader className="text-xl">
                                    Invited to...
                                </CardHeader>
                                <CardContent className="flex flex-col gap-y-6 text-center text-2xl">
                                    <p> Organization Name </p>
                                    <div className="flex flex-row justify-around">
                                        <Button> Accept </Button>
                                        <Button> Deny </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    )})}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
  }
  