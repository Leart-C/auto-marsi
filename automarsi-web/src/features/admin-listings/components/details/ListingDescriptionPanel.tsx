import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ListingDescriptionPanelProps = {
  description: string | null
}

function ListingDescriptionPanel({
  description,
}: ListingDescriptionPanelProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-base">Description</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {description || 'No description has been added.'}
        </p>
      </CardContent>
    </Card>
  )
}

export default ListingDescriptionPanel
