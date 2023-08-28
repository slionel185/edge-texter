import { useForm } from 'react-hook-form'

import { DispatchFormType } from '@/types/DispatchForm'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger } from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'

export default function Dispatch() {
    const form = useForm<DispatchFormType>()

    function onSubmit(values: DispatchFormType) {
        window.electron.ipcRenderer.invoke('dispatch', [{ ...values }])
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex w-full flex-col gap-4'>
                    <FormField control={form.control} name='bucket' render={({ field }) => (
                        <FormItem className='w-full'>
                            <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectGroup>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a bucket' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='WEB_LEAD'>Web Lead</SelectItem>
                                        <SelectItem value='VIP_GIEST'>VIP Guest</SelectItem>
                                        <SelectItem value='PAID_PASS'>Paid Pass</SelectItem>
                                        <SelectItem value='MISSED_GUEST'>Missed Guest</SelectItem>
                                        <SelectItem value='APPT_NO_SHOW'>Appt. No Show</SelectItem>
                                        <SelectItem value='EXPIRED_GUEST'>Expired Guest</SelectItem>
                                        <SelectItem value='GUEST_OF_TOTAL'>Guest of Total</SelectItem>
                                        <SelectItem value='CANCELLED'>Cancelled Member</SelectItem>
                                        <SelectItem value='COLLECTIONS'>Return for Collections</SelectItem>
                                    </SelectContent>
                                </SelectGroup>
                            </Select>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='sortBy' render={({ field }) => (
                        <FormItem className='w-full flex items-center gap-3'>
                            <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectGroup className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Sort By' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='DEFAULT'>Default</SelectItem>
                                        <SelectItem value='CREATED_ASCENDING'>Created Date Asc.</SelectItem>
                                        <SelectItem value='CREATED_DESCENDING'>Created Date Desc.</SelectItem>
                                    </SelectContent>
                                </SelectGroup>
                            </Select>
                        </FormItem>
                    )} />
                    <div className='flex w-full gap-4'>
                        <FormField control={form.control} name='previousContact' render={({ field }) => (
                            <FormItem className='w-full flex items-center gap-2'>
                                <Input placeholder='Last Contacted (number)' {...field} />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='amount' render={({ field }) => (
                            <FormItem className='w-full flex items-center gap-2'>
                                <Input placeholder='Amount (number)' {...field} />
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name='text' render={({ field }) => (
                        <FormItem className='w-full flex items-center'>
                            <Textarea className='resize-none' placeholder='Text to send...' {...field} />
                        </FormItem>
                    )} />

                    <Button type='submit' className='w-full mt-2'>Start</Button>
                </div>
            </form>
        </Form>
    )
}