import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            if (session?.user?.email) {
                await connectToDB();
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            }
            return session;
        },
        async signIn({ account, profile }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log("Sign in error:", error);
                return false;
            }
        }
    }
});

export const GET = handlers.GET;
export const POST = handlers.POST;