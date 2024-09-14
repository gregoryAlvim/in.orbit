import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createCompletionRoute } from './http/routes/create-completion'
import { createGoalRoute } from './http/routes/create-goal'
import { getPendingGoalsRoute } from './http/routes/get-pending-goals'
import { getWeekSummaryRoute } from './http/routes/get-week-summary'
import fastifyCors from '@fastify/cors'
import { deleteCompletionRoute } from './http/routes/delete-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(deleteCompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('running on port 3333')
  })
