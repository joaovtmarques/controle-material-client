"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { components } from "@/constants/menu";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user-store";

export default function Header() {
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);

  return (
    <>
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Card className="w-max flex gap-2 items-center border border-zinc-800 h-12 px-4">
            <div className="h-5 w-5 rounded-full bg-green-400"></div>
            <h4 className="font-medium text-sm">
              {user.rank + " " + user.warName}
            </h4>
          </Card>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {components.map((component, index) => (
                  <Link
                    href={component.href}
                    legacyBehavior
                    passHref
                    key={index}
                  >
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        `text-sm font-medium ${
                          pathname === component.href
                            ? "text-zinc-50"
                            : "text-zinc-400"
                        }`
                      }
                    >
                      {component.title}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <Input placeholder="Buscar..." className="w-72 h-12" />
          <Avatar>
            <AvatarFallback>
              {user.warName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <Separator />
    </>
  );
}
