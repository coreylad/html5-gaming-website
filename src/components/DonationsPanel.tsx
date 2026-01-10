import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { CurrencyDollar, Copy, Plus, Trash, Pencil, Check } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface DonationOption {
  id: string
  type: 'paypal' | 'stripe' | 'subscription'
  name: string
  amount?: number
  currency: string
  buttonId?: string
  enabled: boolean
  description?: string
}

export function DonationsPanel() {
  const [donationOptions, setDonationOptions] = useKV<DonationOption[]>('donation-options', [])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newOption, setNewOption] = useState<Partial<DonationOption>>({
    type: 'paypal',
    currency: 'USD',
    enabled: true
  })

  // PayPal and Stripe configuration
  const [paypalEmail, setPaypalEmail] = useKV<string>('paypal-email', '')
  const [stripePublicKey, setStripePublicKey] = useKV<string>('stripe-public-key', '')

  const handleAddOption = () => {
    if (!newOption.name) {
      toast.error('Please enter a name')
      return
    }

    const option: DonationOption = {
      id: Date.now().toString(),
      type: newOption.type as 'paypal' | 'stripe' | 'subscription',
      name: newOption.name,
      amount: newOption.amount,
      currency: newOption.currency || 'USD',
      buttonId: newOption.buttonId,
      enabled: newOption.enabled ?? true,
      description: newOption.description
    }

    setDonationOptions((current = []) => [...current, option])
    setNewOption({ type: 'paypal', currency: 'USD', enabled: true })
    setIsAddingNew(false)
    toast.success('Donation option added')
  }

  const handleDeleteOption = (id: string) => {
    setDonationOptions((current = []) => current.filter(opt => opt.id !== id))
    toast.success('Donation option deleted')
  }

  const handleToggleEnabled = (id: string) => {
    setDonationOptions((current = []) => 
      current.map(opt => 
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    )
  }

  const copyEmbedCode = (option: DonationOption) => {
    let code = ''
    
    if (option.type === 'paypal') {
      if (option.buttonId) {
        code = `<form action="https://www.paypal.com/donate" method="post" target="_top">
  <input type="hidden" name="hosted_button_id" value="${option.buttonId}" />
  <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
</form>`
      } else {
        code = `<form action="https://www.paypal.com/donate" method="post" target="_top">
  <input type="hidden" name="business" value="${paypalEmail}" />
  <input type="hidden" name="amount" value="${option.amount}" />
  <input type="hidden" name="currency_code" value="${option.currency}" />
  <input type="hidden" name="item_name" value="${option.name}" />
  <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal" alt="Donate with PayPal" />
</form>`
      }
    }

    navigator.clipboard.writeText(code)
    toast.success('Embed code copied to clipboard')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="options" className="w-full">
        <TabsList>
          <TabsTrigger value="options">Donation Options</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="options" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manage Donations</CardTitle>
                  <CardDescription>
                    Create and manage PayPal donations, subscriptions, and other payment options
                  </CardDescription>
                </div>
                <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAddingNew && (
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="text-base">Add New Donation Option</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select 
                          value={newOption.type} 
                          onValueChange={(value) => setNewOption({ ...newOption, type: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paypal">PayPal Donation</SelectItem>
                            <SelectItem value="subscription">PayPal Subscription</SelectItem>
                            <SelectItem value="stripe">Stripe Payment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input 
                          placeholder="e.g., One-time donation"
                          value={newOption.name || ''}
                          onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Amount (optional)</Label>
                        <Input 
                          type="number"
                          placeholder="Leave empty for any amount"
                          value={newOption.amount || ''}
                          onChange={(e) => setNewOption({ ...newOption, amount: parseFloat(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Select 
                          value={newOption.currency} 
                          onValueChange={(value) => setNewOption({ ...newOption, currency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="AUD">AUD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(newOption.type === 'paypal' || newOption.type === 'subscription') && (
                        <div className="space-y-2 md:col-span-2">
                          <Label>PayPal Button ID (optional)</Label>
                          <Input 
                            placeholder="Hosted button ID from PayPal"
                            value={newOption.buttonId || ''}
                            onChange={(e) => setNewOption({ ...newOption, buttonId: e.target.value })}
                          />
                        </div>
                      )}

                      <div className="space-y-2 md:col-span-2">
                        <Label>Description (optional)</Label>
                        <Input 
                          placeholder="Brief description"
                          value={newOption.description || ''}
                          onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOption}>
                        <Check className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {donationOptions && donationOptions.length > 0 ? (
                <div className="space-y-3">
                  {donationOptions.map((option) => (
                    <Card key={option.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{option.name}</h3>
                              <Badge variant={option.type === 'subscription' ? 'default' : 'secondary'}>
                                {option.type}
                              </Badge>
                              {!option.enabled && (
                                <Badge variant="outline">Disabled</Badge>
                              )}
                            </div>
                            {option.description && (
                              <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {option.amount && (
                                <span className="flex items-center gap-1">
                                  <CurrencyDollar className="w-4 h-4" />
                                  {option.amount} {option.currency}
                                </span>
                              )}
                              {option.buttonId && (
                                <span className="font-mono text-xs">ID: {option.buttonId}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={option.enabled}
                              onCheckedChange={() => handleToggleEnabled(option.id)}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => copyEmbedCode(option)}
                              title="Copy embed code"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteOption(option.id)}
                              title="Delete"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CurrencyDollar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No donation options yet. Click "Add New" to create one.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Configuration</CardTitle>
              <CardDescription>
                Configure your PayPal account for donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paypal-email">PayPal Email / Merchant ID</Label>
                <Input 
                  id="paypal-email"
                  type="email"
                  placeholder="your@email.com"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This email will be used for PayPal donations. You can also use your PayPal Merchant ID.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How to create PayPal Donation Buttons:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Log in to your PayPal account</li>
                  <li>Go to PayPal Buttons or PayPal.me</li>
                  <li>Create a Donation or Subscribe button</li>
                  <li>Copy the Hosted Button ID</li>
                  <li>Paste it when creating a donation option above</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stripe Configuration</CardTitle>
              <CardDescription>
                Configure your Stripe account for donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Publishable Key</Label>
                <Input 
                  id="stripe-key"
                  placeholder="pk_live_..."
                  value={stripePublicKey}
                  onChange={(e) => setStripePublicKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Your Stripe publishable key (starts with pk_). Keep your secret key secure.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Stripe Integration Notes:</h4>
                <p className="text-sm text-muted-foreground">
                  For full Stripe integration, you'll need a backend server to process payments securely. 
                  The publishable key can be used with Stripe Checkout for client-side payment collection.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
