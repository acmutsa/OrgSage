'use client';

import { acceptInviteAction, deleteInviteAction, getUserInvitesAction } from "@/app/actions/invites";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { selectInviteSchema } from "@/db/zod";
import { useState } from "react";

export default async function Page() {

    const [invites, setInvites] = useState([{}]);

    const handleAccept = (id_: number) => {
        acceptInviteAction({id: id_});
        invites.splice(invites.findIndex(({id}) => {id == id_}), 1)
    }

    const handleDeny = (id: number) => {
        deleteInviteAction({id});
    }

    // const invites = (await getUserInvitesAction())?.data;
    setInvites([
        {id: 1, orgs: {orgName: "skibidi"}},
        {id: 2, orgs: {orgName: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}},
        {id: 3, orgs: {orgName: "notverylong"}},
        {id: 4, orgs: {orgName: "ACM-UTSA"}}
    ]);

    if (!invites) return (
        <div className="align-center flex w-full flex-grow justify-center p-20 text-2xl text-white">
            <p> No invites.</p>
        </div>
    );

    return (
        <div className="align-center flex w-full flex-grow justify-center p-20 text-white">
            <Carousel className="flex h-1/2 w-[20em] items-center">
                <CarouselContent>
                    {invites.map((invite) => { return (
                        <CarouselItem key={invite.id} >
                            <Card className="flex h-full flex-col">
                                <CardHeader className="text-xl">
                                    Invited to...
                                </CardHeader>
                                <CardContent className="flex flex-col gap-y-6 text-2xl">
                                    <p className="overflow-clip text-ellipsis text-center">
                                        {invite.orgs.orgName}
                                    </p>
                                    <div className="flex flex-row justify-around">
                                        <Button onClick={() => handleAccept(invite.id)}>
                                            Accept
                                        </Button>
                                        <Button onClick={() => handleDeny(invite.id)}>
                                            Deny
                                        </Button>
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
  