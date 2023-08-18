import { DocumentBuilder } from "@nestjs/swagger";

const swagger_config = new DocumentBuilder()
.setTitle('Bug Report')
.setDescription('Bug report API integrated with taiga')
.setVersion('1.0')
.build();

export { swagger_config }