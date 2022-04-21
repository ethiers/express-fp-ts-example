import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import { authenticate, generateToken } from './fakeAuth';
import { fold, right, left } from 'fp-ts/lib/Either';

/**
 * From the author: Héctor Valls
 * https://hvalls.dev/posts/intro-functional-fpts
 */

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));  // enables json body deserializer
server.use(bodyParser.json());  // enables json body deserializer

function replyUnauthorized(res: Response): (error: Error) => void {
  return () => res.status(401).end();
}

function replyToken(res: Response): (token: string) => void {
  return token => res.json({ token });
}

async function signIn(email: string, password: string) {
  //isValid
  const isValid: boolean = await authenticate(email, password);

  // Note by Héctor
  // onLeft: In our example, replyUnauthorized, that will be executed when Either left result is returned; Error, in this case.
  // onRight: In our example, replyToken, that will be executed when Either right result is returned; string, in this case.

  return isValid
    ? right(await generateToken(email))
    : left(new Error('bad credentials'));
}

async function handleSignIn(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log('email', email, 'password', password);

  // The second expression is the interesting one. It can be read as "If signIn returns an error,
  // reply with unauthorized response, otherwise, reply with a token". Here are replyUnauthorized and replyToken functions
  fold(replyUnauthorized(res), replyToken(res))(await signIn(email, password));
}

server.get('/signin', function(req: Request, res: Response) {
  console.log('signin');
  return res.send('signin');
});

server.post('/signin', handleSignIn);
server.listen(8080);