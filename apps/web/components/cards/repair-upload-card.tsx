import { useDragUpload } from "@/hooks/repairs/use-drag-upload";
import { Card, CardContent } from "@repo/shadcn/components/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/shadcn/components/empty";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { Input } from "@repo/shadcn/components/input";
import { Button } from "@repo/shadcn/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@repo/shadcn/components/item";
import Image from "next/image";

type RepairUploadCardProps = {
  dragUpload: ReturnType<typeof useDragUpload>;
};

export default function RepairUploadCard({
  dragUpload,
}: RepairUploadCardProps) {
  const {
    image,
    isDragging,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDelete,
    onChangeInput,
    inputFileRef,
    onButtonClick,
  } = dragUpload;

  return (
    <Card className="py-6">
      <CardContent className="sm:px-6">
        <Empty
          className={`border md:border-2 ${isDragging ? "border-chart-5" : "border-dashed"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPhoto />
            </EmptyMedia>
            <EmptyTitle>Drag and drop photo file to upload</EmptyTitle>
            <EmptyDescription>JPG, JPEG and PNG. Max 20 MB.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Input
              ref={inputFileRef}
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              multiple
              onChange={onChangeInput}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onButtonClick}
            >
              Upload Files
            </Button>
          </EmptyContent>
        </Empty>
        {image.length !== 0 && (
          <div className="flex w-full flex-col gap-6 mt-4">
            <ItemGroup className="gap-4">
              {image.map((img, index) => (
                <Item key={index} variant="outline" role="listitem">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <ItemMedia variant="image">
                      <Image
                        src={img.url}
                        alt="image-preview"
                        width={50}
                        height={50}
                        className="aspect-square object-cover"
                      />
                    </ItemMedia>
                    <ItemContent className="w-full">
                      <ItemTitle className="line-clamp-1">
                        {img.metaData.name}
                      </ItemTitle>
                      <ItemDescription>{img.metaData.size}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        size="icon"
                        type="button"
                        variant="destructive"
                        className="size-7"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <IconTrash
                          stroke={2}
                          className="text-destructive-foreground size-4"
                        />
                      </Button>
                    </ItemActions>
                  </div>
                </Item>
              ))}
            </ItemGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
