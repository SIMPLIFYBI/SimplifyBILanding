import { NextResponse } from "next/server";

export async function POST() {
	return NextResponse.json(
		{
			ok: false,
			error:
				"Contact form is disabled. Please use https://www.simplifybi.com/contact-3",
		},
		{ status: 410 },
	);
}

