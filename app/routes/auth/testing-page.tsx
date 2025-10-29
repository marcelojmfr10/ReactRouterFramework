import { useEffect, useState } from "react";
import { Form, Link, NavLink, useNavigation } from "react-router";
import type { Route } from "./+types/testing-page";
import { sleep } from "~/lib/sleep";

export async function action({ request }: Route.ActionArgs) {
  await sleep(1000);
  const data = await request.formData();
  const name = data.get('name');
  const allData = Object.fromEntries(data);

  console.log('server side - action');
  console.log({ name, allData });
  return { ok: true, message: 'todo bien' };
}

export async function clientAction({ serverAction, request }: Route.ClientActionArgs) {
  await sleep(1000);
  // can still call the server action if needed
  const formData = await request.clone().formData();
  const allData = Object.fromEntries(formData);

  const data = await serverAction();
  return { message: 'hola mundo client action', data, allData };
}

export async function loader() {
  console.log('hola mundo server')
  return { message: "Hello, world! desde el loader server" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log('hola mundo client')
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client
  // const data = getDataFromClient();
  // Return the data to expose through useLoaderData()
  return { message: 'hola mundo desde el client loader', serverData };
}

// clientLoader.hydrate = true as const;

export default function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isPosting = navigation.state === 'submitting';

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Testing Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      {/* <p>Matched Routes: {JSON.stringify(matches)}</p> */}

      {mounted ? <p>Matched Routes: {JSON.stringify(matches)}</p> : <p>Cargando...</p>}

      <NavLink to="/auth/testing-args/ABC-123/Marcelo/28" className={({ isPending }) =>
        isPending ? 'text-red-500 underline text-2xl' : 'text-blue-500 underline text-2xl'}>Testing Args</NavLink>

      <Form className="mt-2 flex gap-2" method="post">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="name"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="age"
        />
        <button
          disabled={isPosting}
          className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
          type="submit"
        >
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    </div>
  );
}